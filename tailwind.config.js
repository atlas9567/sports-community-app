module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090D12',
        panel: '#131920',
        panel2: '#192129',
        lime: '#C8FF3D',
        muted: '#8E99A6',
      },
      boxShadow: {
        glow: '0 0 28px rgba(200,255,61,.16)',
        card: '0 12px 30px rgba(0,0,0,.25)',
      },
    },
  },
  plugins: [],
}
