pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        // Docker Hub configuration
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_USERNAME = 'ryantandocker'
        FRONTEND_IMAGE = "${DOCKER_USERNAME}/gun-n-powder-frontend"
        BACKEND_IMAGE = "${DOCKER_USERNAME}/gun-n-powder-backend"
        
        // Git variables
        // Remove 'origin/' from branch name if it exists
        GIT_BRANCH = "${env.GIT_BRANCH ? env.GIT_BRANCH.replaceAll('^origin/', '') : 'main'}"
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Print branch info for debugging
                    sh """
                        echo "Raw GIT_BRANCH: ${env.GIT_BRANCH}"
                        echo "Processed GIT_BRANCH: ${GIT_BRANCH}"
                    """
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('gun_n_powder_frontend') {
                    script {
                        // Build the frontend Docker image
                        sh """
                            docker build -t ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} \
                                       -t ${FRONTEND_IMAGE}:${GIT_BRANCH} \
                                       -f Dockerfile .
                        """
                        
                        // Tag as latest if on main branch
                        if (GIT_BRANCH == 'main' || GIT_BRANCH == 'master') {
                            sh "docker tag ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} ${FRONTEND_IMAGE}:latest"
                        }
                        
                        // Push all tags
                        sh """
                            docker push ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}
                            docker push ${FRONTEND_IMAGE}:${GIT_BRANCH}
                        """
                        
                        if (GIT_BRANCH == 'main' || GIT_BRANCH == 'master') {
                            sh "docker push ${FRONTEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('gun_n_powder_backend') {
                    script {
                        // Build the backend Docker image
                        sh """
                            docker build -t ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} \
                                       -t ${BACKEND_IMAGE}:${GIT_BRANCH} \
                                       -f Dockerfile .
                        """
                        
                        // Tag as latest if on main branch
                        if (GIT_BRANCH == 'main' || GIT_BRANCH == 'master') {
                            sh "docker tag ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} ${BACKEND_IMAGE}:latest"
                        }
                        
                        // Push all tags
                        sh """
                            docker push ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                            docker push ${BACKEND_IMAGE}:${GIT_BRANCH}
                        """
                        
                        if (GIT_BRANCH == 'main' || GIT_BRANCH == 'master') {
                            sh "docker push ${BACKEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Clean up local images and logout from Docker Hub
                    sh """
                        docker rmi ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} ${FRONTEND_IMAGE}:${GIT_BRANCH} || true
                        docker rmi ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} ${BACKEND_IMAGE}:${GIT_BRANCH} || true
                        docker rmi ${FRONTEND_IMAGE}:latest ${BACKEND_IMAGE}:latest || true
                        docker system prune -f
                        docker logout
                    """
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed! Sending notifications...'
        }
        success {
            echo 'Pipeline succeeded! Docker images built and pushed.'
        }
        always {
            cleanWs()
        }
    }
}
