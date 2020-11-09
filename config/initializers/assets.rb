# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.

Dir.glob(Rails.root.join("app/assets/{stylesheets,javascripts}/**/*.{js,css,scss,js.erb,css.erb}")).each do |path|
  x = path.sub(Rails.root.join("app/assets/").to_s, "")
  x = x.sub(/(stylesheets|javascripts)\//, "")
  Rails.application.config.assets.precompile << x
end
