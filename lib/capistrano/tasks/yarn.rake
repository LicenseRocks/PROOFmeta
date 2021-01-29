namespace :yarn do
  desc 'Install dependencies'
  task :install do
    on roles :app do
      within release_path do
        execute :yarn, "install"
      end
    end
  end

  desc 'Build application'
  task :build do
    on roles :app do
      within release_path do
        execute :yarn, "build"
      end
    end
  end
end
