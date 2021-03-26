module.exports = {
  projects: [
    'Website', // shorthand for only root.
    {
      root: './website',
      package: './package.json',
      tsconfig: './tsconfig.json',
      globalComponents: [],
    },
  ],
}
