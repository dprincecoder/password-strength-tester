const meter = document.getElementById("meter-range");
const passwordInput = document.getElementById("password-input");
const reasons = document.getElementById("reasons");

const calcPassStrength = (password) => {
	const weaknesses = [];
	weaknesses.push(weaknessesLength(password));
	weaknesses.push(lowercaseWeakness(password));
	weaknesses.push(uppercaseWeakness(password));
	weaknesses.push(numbercaseWeakness(password));
	weaknesses.push(symbolscaseWeakness(password));
	weaknesses.push(repeatcaseWeakness(password));

	return weaknesses;
};

const weaknessesLength = (password) => {
	const { length } = password;

	if (length === 0) {
		return {
			msg: "",
			deduction: 100,
			color: "red",
		};
	}
	if (length <= 5) {
		return {
			msg: "Your password is too short",
			deduction: 60,
			color: "red",
		};
	}
	if (length <= 8) {
		return {
			msg: "Your password should at least be better",
			deduction: 40,
			color: "yellow",
		};
	}
	if (length <= 12) {
		return {
			msg: "Your password is okay but you could even secure it better",
			deduction: 15,
			color: "green",
		};
	}
};

const updateStrengthMeter = () => {
	const weaknesses = calcPassStrength(passwordInput.value);
	let strength = 100;
	reasons.innerHTML = "";
	weaknesses.map((weakness) => {
		if (weakness === undefined) return;
		strength -= weakness.deduction;
		meter.style.background = weakness.color;
		const el = document.createElement("div");
		el.innerText = weakness.msg;
		reasons.appendChild(el);
	});

	meter.style.setProperty("--strength", strength);
};

const lowercaseWeakness = (password) => {
	return charTypeWeakness(password, /[a-z]/g, "lowercase characters");
};

const uppercaseWeakness = (password) => {
	return charTypeWeakness(password, /[A-Z]/g, "uppercase characters");
};

const numbercaseWeakness = (password) => {
	return charTypeWeakness(password, /[0-9]/g, "numbers");
};

const symbolscaseWeakness = (password) => {
	return charTypeWeakness(
		password,
		/[^0-9A-Za-z\s]/g,
		"symbols or special characters"
	);
};

const repeatcaseWeakness = (password) => {
	const matches = password.match(/(.)\1/g) || [];
	const { length } = matches;
	if (length > 2) {
		return {
			msg: "your password has repeacted characters",
			deduction: length * 10,
		};
	}
};

const charTypeWeakness = (password, regExp, typeOfChar) => {
	const matches = password.match(regExp) || [];
	const { length } = matches;
	if (length === 0) {
		return {
			msg: `Your password has no ${typeOfChar}`,
			deduction: 20,
		};
	}

	if (length <= 1) {
		return {
			msg: `Your password could use more ${typeOfChar}`,
			deduction: 5,
		};
	}
};

updateStrengthMeter();

passwordInput.addEventListener("input", updateStrengthMeter);
