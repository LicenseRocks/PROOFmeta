set :application_name, "metaproof_preview"
set :application_port, 4001
set :instance, "preview"
set :deploy_branch, "develop"

server "138.197.183.107", user: "deployer", roles: %w{app}, port: 28345
