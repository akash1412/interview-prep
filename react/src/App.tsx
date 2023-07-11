import { ChangeEvent, useRef, useState, useTransition } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { usePrevious } from "./hooks/usePrevious";
import Search from "./components/Search";

function App() {
	const [count, setCount] = useState(0);
	const [input, setInput] = useState("");
	const [list, setList] = useState<string[]>([]);
	const timerId = useRef<undefined | number>();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);
	};

	const prevValue = usePrevious(count);

	// const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setInput(e.target.value);
	// 	startTransition(() => {
	// 		const l = [];
	// 		for (let i = 0; i < 10000; i++) {
	// 			l.push(e.target.value);
	// 		}
	// 		setList(l);
	// 	});
	// };

	const handleIncrementCounter = () => {
		timerId.current = setInterval(() => {
			setCount(prev => prev + 1);
		}, 1000);
	};

	const clearTimer = () => {
		clearInterval(timerId?.current);
	};
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
				<div>
					<button onClick={handleIncrementCounter}>count is {count}</button>
					<button onClick={clearTimer}>count is {count}</button>
				</div>
				<Search />
			</div>
		</>
	);
}

export default App;
