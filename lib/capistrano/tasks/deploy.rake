namespace :deploy do
  desc 'Run after deploy hooks'
  task :after_deploy_hooks do
    on roles :app do
      within release_path do
        invoke "yarn:install"
        invoke "setup:copy_dotenv"
        invoke "yarn:build"
        invoke "setup:pm2_config"
        invoke "pm2:delete"
        invoke "pm2:start"
      end
    end
  end
end
