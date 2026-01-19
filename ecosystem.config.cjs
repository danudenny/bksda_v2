module.exports = {
    apps: [
        {
            name: "nuxt-app",
            script: "bun",
            args: "run .output/server/index.mjs",
            env_file: ".env"
        }
    ]
}