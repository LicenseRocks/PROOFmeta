# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Load the Git plugin
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

# Install Node version manager
require 'capistrano/nvm'
# PM2 node process manager
require 'capistrano/pm2'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }

# Run custom after deploy hooks
after "deploy:log_revision", "deploy:after_deploy_hooks"
