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
