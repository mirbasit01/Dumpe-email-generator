<img width="1735" height="831" alt="image" src="https://github.com/user-attachments/assets/eb31286b-0dd3-49ec-bca0-1ccf00052d02" />

# TempMail – Disposable Temporary Email Generator  

A simple web application that uses the **[Gmailnator API](https://rapidapi.com/)** to generate **temporary disposable email addresses**.  
This helps you keep your real inbox clean when signing up for websites, services, or testing.  

![TempMail Screenshot](./screenshot.png)  

---

## 🚀 Features  
- Generate free disposable email addresses  
- Auto-expiring temporary inbox  
- Real-time inbox checking for incoming emails  
- One-click copy email  
- Clean, minimal, and responsive UI  

---

## 🛠️ Tech Stack  
- **Frontend:** HTML, CSS, JavaScript (React/Next.js if you used that)  
- **API:** [Gmailnator API](https://rapidapi.com/) via RapidAPI  
- **Styling:** TailwindCSS (if used) / Custom CSS  

---

## 📦 Installation & Setup  

Clone the repository:  
```bash
git clone https://github.com/your-username/tempmail.git
cd tempmail
```

Install dependencies (if React/Next.js):  
```bash
npm install
```

Create a `.env.local` file and add your RapidAPI credentials:  
```env
RAPIDAPI_KEY=your_api_key_here
RAPIDAPI_HOST=gmailnator.p.rapidapi.com
```

Run the development server:  
```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.  

---

## 📖 API Reference  

### Generate Email  
```http
POST https://gmailnator.p.rapidapi.com/generate-email
```

**Headers:**  
- `X-RapidAPI-Key`: your_api_key  
- `X-RapidAPI-Host`: gmailnator.p.rapidapi.com  

**Response Example:**  
```json
{
  "email": "uf7ff2ed4uvoh@throwaway.email"
}
```

---

## 🤝 Contributing  
Contributions are always welcome!  
- Fork the repo  
- Create a feature branch  
- Submit a pull request 🚀  

---

## 📜 License  
This project is licensed under the **MIT License**.  
