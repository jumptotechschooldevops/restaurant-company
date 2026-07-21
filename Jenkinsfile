pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:${env.PATH}"
        IMAGE_NAME = "restaurant-company"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "===== Environment ====="
                    echo "PATH=$PATH"

                    echo ""
                    echo "===== Node ====="
                    node -v

                    echo ""
                    echo "===== NPM ====="
                    npm -v

                    echo ""
                    echo "===== Docker ====="
                    /usr/local/bin/docker --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    /usr/local/bin/docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

    }

    post {

        success {
            echo "========================================"
            echo "Pipeline completed successfully!"
            echo "========================================"
        }

        failure {
            echo "========================================"
            echo "Pipeline failed."
            echo "========================================"
        }

        always {
            cleanWs()
        }
    }
}
