pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'ahmadyousaf56/todo-backend'
        CLIENT_IMAGE  = 'ahmadyousaf56/todo-client'
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
    }
}
