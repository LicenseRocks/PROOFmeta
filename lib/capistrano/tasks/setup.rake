namespace :setup do
  desc "Copy dotenv file"
  task :copy_dotenv do
    on roles :app do
      within release_path do
        execute :cp, "#{fetch(:root_path)}/#{fetch(:env_name)} ./.env"
      end
    end
  end

  desc "Create PM2 config"
  task :pm2_config do
    on roles :app do
      within release_path do
        config = {
          apps: [
            {
              name: fetch(:pm2_app_name),
              script: "#{fetch(:deploy_to)}/current/node_modules/next/dist/bin/next start -p #{fetch(:port)}",
              env: {
                "NODE_ENV": "production"
              }
            }
          ]
        }
        config_json = config.to_json.gsub(/\\n/,"")
        execute "echo '#{config_json}' > #{release_path}/app.json"
      end
    end
  end
end
