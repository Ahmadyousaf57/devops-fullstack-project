pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'ahmadyousaf56/todo-backend'
        CLIENT_IMAGE  = 'ahmadyousaf56/todo-client'
        SCANNER_HOME  = tool 'sonar-scanner'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }
        stage('Smoke Test') {
            steps {
                sh 'docker compose up -d --build --wait --wait-timeout 180'
                sh 'curl -fsS http://localhost:4000/health && echo'
                sh 'curl -fsS http://localhost:4000/api/todos && echo'
                sh 'curl -fsS http://localhost:3000/api/todos && echo'
            }
            post {
                failure {
                    sh 'docker compose logs --tail=50'
                }
                always {
                    sh 'docker compose down -v'
                }
            }
        }
        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=todo-app -Dsonar.sources=backend/src,client/src'
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:$BUILD_NUMBER ./backend'
                sh 'docker build -t $CLIENT_IMAGE:$BUILD_NUMBER ./client'
                sh 'docker images | grep todo'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
                    sh 'docker push $BACKEND_IMAGE:$BUILD_NUMBER'
                    sh 'docker push $CLIENT_IMAGE:$BUILD_NUMBER'
                    sh 'docker logout'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/base/namespace.yaml'
                sh 'kubectl apply -f k8s/base/'
                sh 'kubectl set image deployment/backend backend=$BACKEND_IMAGE:$BUILD_NUMBER -n todo-app'
                sh 'kubectl set image deployment/frontend frontend=$CLIENT_IMAGE:$BUILD_NUMBER -n todo-app'
                sh 'kubectl rollout status deployment/backend -n todo-app --timeout=300s'
                sh 'kubectl rollout status deployment/frontend -n todo-app --timeout=300s'
            }
        }
        stage('Verify') {
            steps {
                sh 'kubectl get pods -n todo-app'
                sh 'kubectl get deployment backend -n todo-app -o jsonpath="{.spec.template.spec.containers[0].image}"; echo'
                sh 'kubectl get deployment frontend -n todo-app -o jsonpath="{.spec.template.spec.containers[0].image}"; echo'
            }
        }
    }
}
