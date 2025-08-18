import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,            // 0.0.0.0으로 바꿔서 외부에서 접근 가능하게 함
    port: 5173,            // 기본 포트 설정
    strictPort: true,      // 포트 고정 (이미 점유 중이면 오류 발생)
    cors: true             // 모든 origin 허용 (Nginx 프록시용)
  }
})

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,           // 0.0.0.0
//     port: 5173,
//     strictPort: true,
//     cors: true,

//     allowedHosts: ['hwanu.site', 'www.hwanu.site'],
//     // 지정된 도메인만 서버에 접근할 수 있도록 제한
//     // 보안을 위해 의도하지 않은 도메인에서의 접근을 차단

//     // HMR가 새로고침만 되고 안 붙으면 아래 3줄도 같이 켜줘
//     hmr: {
//       host: 'hwanu.site',
//       protocol: 'wss',
//       clientPort: 443
//     }
//   }
// })