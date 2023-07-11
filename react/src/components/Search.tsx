import { ChangeEvent, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOutsideClick";

const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n: number) {
	const threshold = 1000;
	if (n > threshold) n = threshold;
	return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text: string) {
	var pre = "pre";
	var post = "post";
	var results: string[] = [];
	if (getRandomBool(2)) {
		results.push(pre + text);
	}
	if (getRandomBool(2)) {
		results.push(text);
	}
	if (getRandomBool(2)) {
		results.push(text + post);
	}
	if (getRandomBool(2)) {
		results.push(pre + text + post);
	}
	return new Promise((resolve, reject) => {
		const randomTimeout = Math.random() * LATENCY;
		setTimeout(() => {
			if (getRandomBool(FAILURE_COUNT)) {
				reject();
			} else {
				resolve(results);
			}
		}, randomTimeout);
	});
}

const Search = () => {
	const [query, setQuery] = useState("");
	const [showSUggestion, setShowSuggestion] = useState(false);
	const [suggestionList, setSuggestionList] = useState<Array<string>>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	useOnClickOutside(containerRef, () => {
		setShowSuggestion(false);
	});

	const handleQueryChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setQuery(value);
		const resp = await getSuggestions(value);
		setSuggestionList(resp as Array<string>);
	};

	return (
		<div ref={containerRef} style={{ width: "300px" }}>
			<input
				style={{ width: "100%" }}
				value={query}
				onChange={handleQueryChange}
				onFocus={() => setShowSuggestion(true)}
			/>
			{showSUggestion && (
				<div className='suggestionBox'>
					{suggestionList.map(list => (
						<div key={list} onClick={() => setQuery(list)}>
							{list}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
