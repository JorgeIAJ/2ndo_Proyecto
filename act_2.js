const express = require('express');
const app = express();
const PORT = 3001; // Puerto diferente al primer proyecto

// Middleware para permitir JSON en las requests
app.use(express.json());

// Array de frases motivacionales en memoria
let quotes = [
    "El único modo de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
    "No importa lo lento que avances, siempre y cuando no te detengas. - Confucio",
    "Tu tiempo es limitado, así que no lo malgastes viviendo la vida de otra persona. - Steve Jobs",
    "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
    "El futuro pertenece a aquellos que creen en la belleza de sus sueños. - Eleanor Roosevelt",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
    "No sueñes tu vida, vive tu sueño. - Anónimo",
    "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora. - Proverbio chino",
    "Cree en ti mismo y en lo que eres. - Christian D. Larson",
    "La única manera de hacer un gran trabajo es amar lo que haces. - Steve Jobs"
];

// 1. GET /random/quotes → devuelve todas las frases
app.get('/random/quotes', (req, res) => {
    try {
        res.json({
            success: true,
            count: quotes.length,
            quotes: quotes
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al obtener las frases.' 
        });
    }
});

// 2. GET /random/quotes/random → devuelve una frase aleatoria
app.get('/random/quotes/random', (req, res) => {
    try {
        if (quotes.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'No hay frases disponibles en la base de datos.' 
            });
        }
        
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        res.json({
            success: true,
            quote: randomQuote,
            totalQuotes: quotes.length,
            message: 'Frase aleatoria obtenida correctamente.'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al obtener frase aleatoria.' 
        });
    }
});

// 3. POST /random/quotes → agregar una nueva frase
app.post('/random/quotes', (req, res) => {
    try {
        // Verificar que el cuerpo tenga la propiedad 'quote'
        if (!req.body.quote) {
            return res.status(400).json({ 
                success: false,
                error: 'La propiedad "quote" es requerida en el cuerpo de la solicitud.' 
            });
        }

        const newQuote = req.body.quote.trim();
        
        // Validar que la frase no esté vacía
        if (newQuote.length === 0) {
            return res.status(400).json({ 
                success: false,
                error: 'La frase no puede estar vacía.' 
            });
        }

        // Verificar si la frase ya existe
        if (quotes.includes(newQuote)) {
            return res.status(409).json({ 
                success: false,
                error: 'Esta frase ya existe en la base de datos.' 
            });
        }

        // Agregar la nueva frase al array
        quotes.push(newQuote);

        res.status(201).json({
            success: true,
            message: 'Frase agregada correctamente.',
            newQuote: newQuote,
            totalQuotes: quotes.length,
            newQuoteId: quotes.length - 1
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor al agregar la frase.' 
        });
    }
});

// Página de inicio con interfaz web
app.get('/', (req, res) => {
    const codespaceName = process.env.CODESPACE_NAME || 'cautious-bassoon-7v9p6jppj57w26pq';
    const baseUrl = `https://${codespaceName}-${PORT}.app.github.dev`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>API de Frases Motivacionales</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
                min-height: 100vh;
                color: #333;
            }
            .container { 
                max-width: 1000px; 
                margin: 0 auto; 
                background: white; 
                padding: 30px; 
                border-radius: 15px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            h1 { 
                color: #4a5568; 
                text-align: center; 
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            .section { 
                margin: 30px 0; 
                padding: 20px;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                background: #f7fafc;
            }
            .section-title {
                font-size: 1.5em;
                color: #2d3748;
                margin-bottom: 20px;
                text-align: center;
            }
            .btn {
                padding: 12px 24px;
                background: #ff7e5f;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin: 10px 5px;
                transition: background 0.3s;
            }
            .btn:hover {
                background: #e56a4f;
            }
            .btn-secondary {
                background: #4a5568;
            }
            .btn-secondary:hover {
                background: #2d3748;
            }
            .quote-box {
                background: #e6fffa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #38b2ac;
                margin: 15px 0;
                font-style: italic;
            }
            .form-group {
                margin: 15px 0;
            }
            textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #cbd5e0;
                border-radius: 5px;
                font-size: 16px;
                min-height: 100px;
                resize: vertical;
            }
            .result {
                margin-top: 15px;
                padding: 15px;
                background: #e6fffa;
                border-radius: 5px;
                border-left: 4px solid #38b2ac;
            }
            .direct-links {
                margin-top: 30px;
                text-align: center;
            }
            .direct-link {
                display: inline-block;
                margin: 5px;
                padding: 10px 15px;
                background: #edf2f7;
                color: #4a5568;
                text-decoration: none;
                border-radius: 5px;
                border: 1px solid #cbd5e0;
            }
            .direct-link:hover {
                background: #ff7e5f;
                color: white;
            }
            .footer {
                text-align: center;
                margin-top: 40px;
                color: #718096;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>💫 API de Frases Motivacionales</h1>
            
            <!-- Sección para obtener frases -->
            <div class="section">
                <div class="section-title">📖 Obtener Frases</div>
                <button class="btn" onclick="getAllQuotes()">Ver Todas las Frases</button>
                <button class="btn btn-secondary" onclick="getRandomQuote()">Obtener Frase Aleatoria</button>
                <div id="quotesResult" class="result"></div>
            </div>

            <!-- Sección para agregar frases -->
            <div class="section">
                <div class="section-title">✏️ Agregar Nueva Frase</div>
                <div class="form-group">
                    <textarea id="newQuote" placeholder="Escribe tu frase motivacional aquí..."></textarea>
                </div>
                <button class="btn" onclick="addNewQuote()">Agregar Frase</button>
                <div id="addResult" class="result"></div>
            </div>

            <!-- Enlaces directos -->
            <div class="direct-links">
                <h3>🔗 Endpoints de la API:</h3>
                <a href="${baseUrl}/random/quotes" class="direct-link" target="_blank">GET /random/quotes</a>
                <a href="${baseUrl}/random/quotes/random" class="direct-link" target="_blank">GET /random/quotes/random</a>
                <a href="${baseUrl}/random/quotes" class="direct-link" target="_blank">POST /random/quotes</a>
            </div>

            <div class="footer">
                <p>✨ Desarrollado con Express.js | GitHub Codespaces</p>
            </div>
        </div>

        <script>
            const baseUrl = '${baseUrl}';

            // Función para obtener todas las frases
            async function getAllQuotes() {
                try {
                    const response = await fetch(baseUrl + '/random/quotes');
                    const data = await response.json();
                    
                    if (data.success) {
                        let html = '<h3>📚 Todas las Frases (' + data.count + ')</h3>';
                        data.quotes.forEach((quote, index) => {
                            html += '<div class="quote-box">' + (index + 1) + '. ' + quote + '</div>';
                        });
                        document.getElementById('quotesResult').innerHTML = html;
                    } else {
                        document.getElementById('quotesResult').innerHTML = '❌ Error: ' + data.error;
                    }
                } catch (error) {
                    document.getElementById('quotesResult').innerHTML = '❌ Error de conexión: ' + error.message;
                }
            }

            // Función para obtener frase aleatoria
            async function getRandomQuote() {
                try {
                    const response = await fetch(baseUrl + '/random/quotes/random');
                    const data = await response.json();
                    
                    if (data.success) {
                        document.getElementById('quotesResult').innerHTML = '
                            <h3>🎲 Frase Aleatoria</h3>
                            <div class="quote-box">' + data.quote + '</div>
                            <p>Total de frases disponibles: ' + data.totalQuotes + '</p>
                        ';
                    } else {
                        document.getElementById('quotesResult').innerHTML = '❌ Error: ' + data.error;
                    }
                } catch (error) {
                    document.getElementById('quotesResult').innerHTML = '❌ Error de conexión: ' + error.message;
                }
            }

            // Función para agregar nueva frase
            async function addNewQuote() {
                const quoteText = document.getElementById('newQuote').value.trim();
                
                if (!quoteText) {
                    document.getElementById('addResult').innerHTML = '❌ Por favor escribe una frase.';
                    return;
                }

                try {
                    const response = await fetch(baseUrl + '/random/quotes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ quote: quoteText })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        document.getElementById('addResult').innerHTML = '
                            ✅ ' + data.message + '
                            <div class="quote-box">' + data.newQuote + '</div>
                            <p>Total de frases: ' + data.totalQuotes + '</p>
                        ';
                        document.getElementById('newQuote').value = '';
                    } else {
                        document.getElementById('addResult').innerHTML = '❌ Error: ' + data.error;
                    }
                } catch (error) {
                    document.getElementById('addResult').innerHTML = '❌ Error de conexión: ' + error.message;
                }
            }
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    const codespaceName = process.env.CODESPACE_NAME || 'cautious-bassoon-7v9p6jppj57w26pq';
    const host = `${codespaceName}-${PORT}.app.github.dev`;
    
    console.log(`\n💫 === API DE FRASES MOTIVACIONALES INICIADA ===`);
    console.log(`📍 Servidor local: http://localhost:${PORT}`);
    console.log(`🌐 URL pública: https://${host}`);
    console.log(`\n📋 --- ENDPOINTS DISPONIBLES ---`);
    console.log(`✅ GET  /random/quotes → Todas las frases`);
    console.log(`✅ GET  /random/quotes/random → Frase aleatoria`);
    console.log(`✅ POST /random/quotes → Agregar nueva frase`);
    console.log(`✅ GET  / → Interfaz web`);
    console.log(`\n🔗 --- EJEMPLOS PRÁCTICOS ---`);
    console.log(`👉 https://${host}/random/quotes`);
    console.log(`👉 https://${host}/random/quotes/random`);
    console.log(`👉 https://${host}/`);
    console.log(`\n💡 --- USO CON CURL ---`);
    console.log(`Obtener todas las frases:`);
    console.log(`  curl https://${host}/random/quotes`);
    console.log(`\nObtener frase aleatoria:`);
    console.log(`  curl https://${host}/random/quotes/random`);
    console.log(`\nAgregar nueva frase:`);
    console.log(`  curl -X POST https://${host}/random/quotes \\`);
    console.log(`       -H "Content-Type: application/json" \\`);
    console.log(`       -d '{"quote":"Tu nueva frase motivadora"}'`);
    console.log(`\n==============================================`);
});

// Manejo de errores
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error.message);
    if (error.code === 'EADDRINUSE') {
        console.log(`💡 El puerto ${PORT} está ocupado. Intenta con otro puerto:`);
        console.log(`   const PORT = 3002; // o 8081, 5001, etc.`);
    }
});