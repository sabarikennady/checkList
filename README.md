# 📋 CheckList

A **React Native** application to manage checklists efficiently with swipe actions, editable lists, and seamless UI updates.

## 🚀 Features

✅ **Create Checklists** – Add multiple items under a title.  
✅ **Edit Checklists** – Modify, delete, and reorder items.  
✅ **Swipe Actions** – Mark items as done/undone and delete with swipe gestures.  
✅ **Persistent Storage** – Saves data using React Context API and Async Storage.  
✅ **Smooth UI** – Uses `react-native-gesture-handler` and `react-native-reanimated` for fluid interactions.

---

## 🛠️ Tech Stack

- **React Native**
- **React Context API** (for state management)
- **react-native-gesture-handler** (for swipe gestures)
- **react-native-reanimated** (for animations)
- **TypeScript** (optional, if used)
- **Jest + React Native Testing Library** (for unit tests)

---

## 📽️ Demo

[Watch the recording](https://github.com/sabarikennady/checkList/blob/main/assets/recording.webm)

---

## 📦 Installation

1️⃣ **Clone the repo**

```sh
git clone https://github.com/sabarikennady/checkList.git
cd checkList
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Run the app**

- For **Android**:
  ```sh
  npm run android
  ```
- For **iOS**:
  ```sh
  npx pod-install
  npm run ios
  ```

---

## 🧪 Running Tests

```sh
npm test
```

or

```sh
npx jest
```

---

## 📂 Project Structure

```
src/
│-- components/   # Reusable UI components (e.g., SwipeableItem)
│-- context/      # Context API for global state management
│-- screens/      # All app screens (Checklist, PreDepartureChecklist etc.)
│-- App.js        # Root component
```
