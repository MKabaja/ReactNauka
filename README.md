# ReactNauka 📚

Kolekcja projektów i ćwiczeń z nauki **React** i **TypeScript**, zbudowanych z użyciem Vite. Każdy folder to osobna mini-aplikacja demonstrujący konkretny koncept lub zestaw zagadnień z ekosystemu React.

---

## 🗂️ Struktura repozytorium

| Folder | Opis | Technologia |
|--------|------|-------------|
| `AdvancedState` | Zaawansowane zarządzanie stanem – Context API + useReducer | React (JSX) |
| `Cwieczenie_useContext_reducer` | Ćwiczenie: useContext + useReducer | React (JSX) |
| `DEBUGING` | Techniki debugowania aplikacji React | React (JSX) |
| `Food Order app` | Aplikacja do składania zamówień jedzenia z koszykiem i backendem | React + TypeScript |
| `FormActions` | Obsługa akcji formularzy w React | React + TypeScript |
| `Project-Manging` | Aplikacja do zarządzania projektami i zadaniami | React (JSX) |
| `Quiz` | Aplikacja quizowa z logiką pytań i odpowiedzi | React (JSX) |
| `REACT-PodMaska` | Projekt "pod maskę" – dogłębna analiza mechanizmów Reacta | React (JSX) |
| `REACT-http-req` | Obsługa żądań HTTP (fetch/async) z backendem | React (JSX) |
| `React-ComponentyKlasowe` | Komponenty klasowe React | React (JSX) |
| `React-FormHandling` | Walidacja i obsługa formularzy | React (JSX) |
| `ReactFormActions2` | Zaawansowane akcje formularzy z backendem | React + TypeScript |
| `Refs-Portals` | Praca z `useRef` i React Portals | React (JSX) |
| `Styling` | Stylowanie komponentów (CSS Modules, Inline Styles, Tailwind) | React (JSX) |
| `TS-REACT-pod-maska` | "Pod maskę" Reacta – wersja TypeScript | React + TypeScript |
| `TS-React-classComponents` | Komponenty klasowe w TypeScript | React + TypeScript |
| `TS-Redux` | Zarządzanie stanem z Redux Toolkit w TypeScript | React + TypeScript |
| `TS-dataFetching` | Pobieranie danych (data fetching) z TypeScript | React + TypeScript |
| `TS-react-01` | Podstawy React z TypeScript – part 1 | React + TypeScript |
| `TS-react-02` | Podstawy React z TypeScript – part 2 | React + TypeScript |
| `TS-react-Adv-State` | Zaawansowany stan w TypeScript | React + TypeScript |
| `TS-react-quiz` | Aplikacja quizowa w TypeScript | React + TypeScript |
| `sideEffects` | Efekty uboczne – `useEffect`, cleanup, zależności | React (JSX) |
| `ts-react` | Projekt startowy React + TypeScript | React + TypeScript |

---

## 🚀 Jak uruchomić projekt?

Każdy folder jest niezależną aplikacją Vite. Aby uruchomić wybrany projekt:

```bash
# 1. Przejdź do wybranego folderu
cd <nazwa-folderu>

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

> Niektóre projekty (np. `Food Order app`, `REACT-http-req`, `ReactFormActions2`) zawierają folder `backend/`. W takim przypadku należy uruchomić backend osobno:
>
> ```bash
> cd <nazwa-folderu>/backend
> node app.js
> ```

---

## 🛠️ Stack technologiczny

- **React 19** – biblioteka UI
- **TypeScript** – typy statyczne (wybrane projekty)
- **Vite** – bundler i dev server
- **Redux Toolkit** – zarządzanie globalnym stanem (projekt `TS-Redux`)
- **CSS Modules / Inline Styles / Tailwind** – stylowanie (projekt `Styling`)
- **Node.js / Express** – prosty backend w wybranych projektach

---

## 📋 Wymagania

- Node.js >= 18
- npm >= 9
