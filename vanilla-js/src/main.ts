import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { handleFetchWithTimeout } from "./fetchTimeout.ts";
import { cachedApiCall } from "./cacheApiCall.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="fetchWithTimeout" type="button">fetchWithTimeout</button>
      <button id="catcheCall" type="button">catcheCall</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

document
	.querySelector<HTMLButtonElement>("#fetchWithTimeout")
	?.addEventListener("click", () =>
		handleFetchWithTimeout("https://jsonplaceholder.typicode.com/posts", 500)
			.then(res => console.log("response", res))
			.catch(err => console.log("error", err))
	);

document
	.querySelector<HTMLButtonElement>("#catcheCall")
	?.addEventListener("click", () => {
		const call = cachedApiCall();
		call("https://jsonplaceholder.typicode.com/posts")
			.then(res => console.log("response", res))
			.catch(err => console.log("error", err));
	});
