"use client"

import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { Provider } from "react-redux"
import store from "../store/store"
import theme from "../theme"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
