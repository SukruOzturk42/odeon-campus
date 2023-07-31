pipeline {
    
  agent any

  tools {nodejs 'node'}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Start') {
            steps {
                sh 'npm start'
            }
        }
    }
}