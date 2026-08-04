pipeline {
    agent { label 'agent' }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${env.PATH}"

        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "230026708124"
        ECR_REPOSITORY = "restaurant-company"

        ECR_REGISTRY = "230026708124.dkr.ecr.us-east-1.amazonaws.com"
        IMAGE_NAME = "restaurant-company"
        IMAGE_TAG = "${BUILD_NUMBER}"

        SONAR_PROJECT_KEY = "restaurant-company"
        SONAR_PROJECT_NAME = "restaurant-company"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    node -v
                    npm -v
                    docker --version
                    aws --version
                    trivy --version
                    sonar-scanner --version || true
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    if [ -f package-lock.json ]; then
                        npm ci
                    else
                        npm install
                    fi
                '''
            }
        }

        stage('Parallel Quality Checks') {

            failFast true

            parallel {

                stage('Lint') {
                    steps {
                        sh '''
                            if npm run | grep -q "lint"; then
                                npm run lint
                            else
                                echo "No lint script found."
                            fi
                        '''
                    }
                }

                stage('Unit Tests') {
                    steps {
                        sh '''
                            if npm run | grep -q "test"; then
                                CI=true npm test || true
                            else
                                echo "No tests configured."
                            fi
                        '''
                    }
                }

                stage('SonarQube Scan') {
                    steps {
                        withSonarQubeEnv('SonarQube') {
                            sh '''
                                sonar-scanner \
                                -Dsonar.projectKey=restaurant-company \
                                -Dsonar.projectName=restaurant-company \
                                -Dsonar.sources=src \
                                -Dsonar.sourceEncoding=UTF-8
                            '''
                        }
                    }
                }

                stage('Trivy Filesystem Scan') {
                    steps {
                        sh '''
                            trivy fs \
                            --severity HIGH,CRITICAL \
                            --ignore-unfixed \
                            --exit-code 0 \
                            .
                        '''
                    }
                }

            }
        }

        stage('Build Application') {
            steps {
                sh '''
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${IMAGE_TAG} \
                      -t ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG} \
                      -t ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest \
                      .
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    trivy image \
                    --severity HIGH,CRITICAL \
                    --ignore-unfixed \
                    --exit-code 0 \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login \
                    --username AWS \
                    --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                    docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                    docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                '''
            }
        }

        stage('Verify Image') {
            steps {
                sh '''
                    aws ecr describe-images \
                    --repository-name ${ECR_REPOSITORY} \
                    --image-ids imageTag=${IMAGE_TAG} \
                    --region ${AWS_REGION}
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Replace this stage with Helm, ArgoCD, kubectl, or ECS deployment.'
            }
        }
    }

    post {

        success {
            echo "Pipeline completed successfully."
        }

        failure {
            echo "Pipeline failed."
        }

        always {
            cleanWs()
        }
    }
}
