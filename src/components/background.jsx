// import { useEffect, useRef } from "react"

// export default function BlockchainBackground() {
//     const canvasRef = useRef(null)
//     const animationRef = useRef(0)

//     useEffect(() => {
//         const canvas = canvasRef.current
//         if (!canvas) return

//         const ctx = canvas.getContext("2d")
//         if (!ctx) return

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth
//             canvas.height = window.innerHeight
//         }

//         resizeCanvas()
//         window.addEventListener("resize", resizeCanvas)

//         const nodes = []
//         const connections = []
//         const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 30)

//         for (let i = 0; i < nodeCount; i++) {
//             nodes.push({
//                 x: Math.random() * canvas.width,
//                 y: Math.random() * canvas.height,
//                 radius: Math.random() * 2 + 2,
//                 vx: (Math.random() - 0.5) * 0.5,
//                 vy: (Math.random() - 0.5) * 0.5,
//                 connected: false,
//             })
//         }

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height)

//             const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
//             gradient.addColorStop(0, "#0f172a")
//             gradient.addColorStop(1, "#1e293b")
//             ctx.fillStyle = gradient
//             ctx.fillRect(0, 0, canvas.width, canvas.height)

//             ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
//             ctx.lineWidth = 0.5
//             const gridSize = 30

//             for (let x = 0; x < canvas.width; x += gridSize) {
//                 ctx.beginPath()
//                 ctx.moveTo(x, 0)
//                 ctx.lineTo(x, canvas.height)
//                 ctx.stroke()
//             }

//             for (let y = 0; y < canvas.height; y += gridSize) {
//                 ctx.beginPath()
//                 ctx.moveTo(0, y)
//                 ctx.lineTo(canvas.width, y)
//                 ctx.stroke()
//             }

//             for (let i = connections.length - 1; i >= 0; i--) {
//                 const connection = connections[i]
//                 connection.age++

//                 if (connection.age >= connection.maxAge) {
//                     connections.splice(i, 1)
//                     continue
//                 }

//                 const alpha = 1 - connection.age / connection.maxAge
//                 ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.8})`
//                 ctx.lineWidth = alpha * 2

//                 ctx.beginPath()
//                 ctx.moveTo(connection.source.x, connection.source.y)
//                 ctx.lineTo(connection.target.x, connection.target.y)
//                 ctx.stroke()

//                 const progress = connection.age / connection.maxAge
//                 const packetX = connection.source.x + (connection.target.x - connection.source.x) * progress
//                 const packetY = connection.source.y + (connection.target.y - connection.source.y) * progress

//                 ctx.fillStyle = `rgba(168, 85, 247, ${(1 - progress) * 0.8})`
//                 ctx.beginPath()
//                 ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
//                 ctx.fill()
//             }

//             nodes.forEach((node) => {
//                 node.x += node.vx
//                 node.y += node.vy

//                 if (node.x < 0 || node.x > canvas.width) node.vx *= -1
//                 if (node.y < 0 || node.y > canvas.height) node.vy *= -1

//                 node.x = Math.max(0, Math.min(canvas.width, node.x))
//                 node.y = Math.max(0, Math.min(canvas.height, node.y))

//                 const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4)
//                 glow.addColorStop(0, "rgba(59, 130, 246, 0.8)")
//                 glow.addColorStop(1, "rgba(59, 130, 246, 0)")

//                 ctx.fillStyle = glow
//                 ctx.beginPath()
//                 ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2)
//                 ctx.fill()

//                 ctx.fillStyle = node.connected ? "#a855f7" : "#3b82f6"
//                 ctx.beginPath()
//                 ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
//                 ctx.fill()
//             })

//             if (Math.random() < 0.05 && nodes.length > 1) {
//                 const sourceIndex = Math.floor(Math.random() * nodes.length)
//                 let targetIndex
//                 do {
//                     targetIndex = Math.floor(Math.random() * nodes.length)
//                 } while (targetIndex === sourceIndex)

//                 const source = nodes[sourceIndex]
//                 const target = nodes[targetIndex]

//                 connections.push({
//                     source,
//                     target,
//                     age: 0,
//                     maxAge: 100 + Math.random() * 100,
//                 })

//                 source.connected = true
//                 target.connected = true

//                 setTimeout(() => {
//                     source.connected = false
//                     target.connected = false
//                 }, 2000)
//             }

//             if (Math.random() < 0.1) {
//                 const x = Math.random() * canvas.width
//                 const y = Math.random() * canvas.height
//                 const size = Math.random() * 1.5

//                 ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
//                 ctx.beginPath()
//                 ctx.arc(x, y, size, 0, Math.PI * 2)
//                 ctx.fill()
//             }

//             animationRef.current = requestAnimationFrame(animate)
//         }

//         animate()

//         return () => {
//             window.removeEventListener("resize", resizeCanvas)
//             cancelAnimationFrame(animationRef.current)
//         }
//     }, [])

//     return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ background: "#0f172a" }} />
// }


import { useEffect, useRef } from "react"

export default function BlockchainBackground() {
    const canvasRef = useRef(null)
    const animationRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const nodes = []
        const connections = []
        const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 30)

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                connected: false,
            })
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, "#0f172a")
            gradient.addColorStop(1, "#1e293b")
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
            ctx.lineWidth = 0.5
            const gridSize = 30

            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }

            for (let i = connections.length - 1; i >= 0; i--) {
                const connection = connections[i]
                connection.age++

                if (connection.age >= connection.maxAge) {
                    connections.splice(i, 1)
                    continue
                }

                const alpha = 1 - connection.age / connection.maxAge
                ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.8})`
                ctx.lineWidth = alpha * 2

                ctx.beginPath()
                ctx.moveTo(connection.source.x, connection.source.y)
                ctx.lineTo(connection.target.x, connection.target.y)
                ctx.stroke()

                const progress = connection.age / connection.maxAge
                const packetX = connection.source.x + (connection.target.x - connection.source.x) * progress
                const packetY = connection.source.y + (connection.target.y - connection.source.y) * progress

                ctx.fillStyle = `rgba(168, 85, 247, ${(1 - progress) * 0.8})`
                ctx.beginPath()
                ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
                ctx.fill()
            }

            nodes.forEach((node) => {
                node.x += node.vx
                node.y += node.vy

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1

                node.x = Math.max(0, Math.min(canvas.width, node.x))
                node.y = Math.max(0, Math.min(canvas.height, node.y))

                const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4)
                glow.addColorStop(0, "rgba(59, 130, 246, 0.8)")
                glow.addColorStop(1, "rgba(59, 130, 246, 0)")

                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = node.connected ? "#a855f7" : "#3b82f6"
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            if (Math.random() < 0.05 && nodes.length > 1) {
                const sourceIndex = Math.floor(Math.random() * nodes.length)
                let targetIndex
                do {
                    targetIndex = Math.floor(Math.random() * nodes.length)
                } while (targetIndex === sourceIndex)

                const source = nodes[sourceIndex]
                const target = nodes[targetIndex]

                connections.push({
                    source,
                    target,
                    age: 0,
                    maxAge: 100 + Math.random() * 100,
                })

                source.connected = true
                target.connected = true

                setTimeout(() => {
                    source.connected = false
                    target.connected = false
                }, 2000)
            }

            if (Math.random() < 0.1) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                const size = Math.random() * 1.5

                ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        // <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        //   {/* Background canvas */}
        //   <canvas
        //     ref={canvasRef}
        //     className="absolute inset-0 -z-10"
        //     style={{ background: "#0f172a" }}
        //   />

        //   {/* Content Block Overlaid on Background */}
        //   <div className="absolute top-0 left-0 z-10 text-center p-4 sm:p-8 max-w-3xl w-full text-white backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-lg">
        //     <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-md">
        //       Blockchain Innovation
        //     </h1>
        //   </div>
        // </div>
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 -z-10"
                style={{ background: "#0f172a" }}
            />
        </div>
    )
}

