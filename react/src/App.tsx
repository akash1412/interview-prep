import { useRef, ChangeEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";
import { usePrevious } from "./hooks/usePrevious";

function App() {
	const [count, setCount] = useState(0);
	const [input, setInput] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);
	};

	const prevValue = usePrevious(count);

	const debounce = useDebounce(handleChange, 3000);

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<span>prevValue:{prevValue}</span>
				<input onChange={debounce} />
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
