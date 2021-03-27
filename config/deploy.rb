# config valid for current version and patch releases of Capistrano
lock "~> 3.15.0"

set :repo_url, "git@github.com:LicenseRocks/meta-proof.git"
set :branch, -> { fetch(:deploy_branch) }

# Default deploy_to directory is /var/www/my_app_name
set :root_path, "/var/www"
set :port, -> { fetch(:application_port) }
set :deploy_to, -> { "#{fetch(:root_path)}/#{fetch(:application_name)}" }

# Environment variable files
set :env_name, -> { "metaproof_#{fetch(:instance)}_env" }

set :pm2_app_name, -> { "metaproof_#{fetch(:instance)}" }
set :pm2_target_path, -> { release_path }
set :pm2_app_command, 'app.json'
set :pm2_roles, :app

# Default value for keep_releases is 5
set :keep_releases, 5

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, "v14.15.5"
set :nvm_map_bins, %w{node npm yarn}

# Default value for linked_dirs is []
# append :linked_dirs, "node_modules"
