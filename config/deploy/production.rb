set :application_name, "metaproof_production"
set :application_port, 4000
set :instance, "production"
set :deploy_branch, "main"

server "138.197.183.107", user: "deployer", roles: %w{app}, port: 28345
