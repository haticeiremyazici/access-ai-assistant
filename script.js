const API_KEY = "AIzaSyCkpHkY_gGAGstnhs8QGYxhO-Hh1PLfnQo"; // 

document.getElementById('solveBtn').addEventListener('click', async () => {
    const text = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');
    const resultArea = document.getElementById('resultArea');

    if (!text) return alert("Lütfen bir metin girin.");

    outputDiv.innerText = "Sadeleştiriliyor...";
    resultArea.classList.remove('hidden');

    const prompt = `Aşağıdaki metni bilişsel engeli olan bir bireyin anlayabileceği şekilde, kısa cümlelerle ve maddeler halinde sadeleştir: ${text}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        outputDiv.innerText = data.candidates[0].content.parts[0].text;
    } catch (error) {
        outputDiv.innerText = "Hata oluştu: " + error.message;
    }
});