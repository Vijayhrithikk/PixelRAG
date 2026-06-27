package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware allows Next.js frontend to communicate with Gin
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"system":  "PixelRAG",
			"message": "Backend is running and ready.",
		})
	})

	r.Run(":8080")
}
