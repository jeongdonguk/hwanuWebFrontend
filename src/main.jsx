import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";  // Redux Provider 추가
import store from "./store/store";  // Redux 스토어 가져오기
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Redux Provider로 감싸기 */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
