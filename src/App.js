import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {

	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	let isValueValid = true;
	value.length < 3 ? isValueValid = false : isValueValid = true;

	const onInputButtonClick = () => {
		const promptValue = prompt();
		setValue(promptValue);

		promptValue.length < 3 ? setError('Введенное значение должно содержать минимум 3 символа') : setError('');
	}

	const formatDate = (date) => {
		let day = date.getDate();
		day < 10 ? day = "0" + day : day = "" + day;

		let month = date.getMonth() + 1;
		month < 10 ? month = "0" + month : month = "" + month;

		let hour = date.getHours();
		hour < 10 ? hour = "0" + hour : hour = "" + hour;

		let minutes = date.getMinutes();
		minutes < 10 ? minutes = "0" + minutes : minutes = "" + minutes;

		let seconds = date.getSeconds();
		seconds < 10 ? seconds = "0" + seconds : seconds = "" + seconds;

		return `${day}.${month}.${date.getFullYear()} ${hour}:${minutes}:${seconds}`;
	}

	const onAddButtonClick = () => {
		let id = Date.now();
		let date = new Date();
		if (value.length >= 3) {
			setValue('');
			setError('');
			setList([...list, { id: id, value: value, date: formatDate(date)}]);
			console.log(list);
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
			Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : ''}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
				<button className={styles.button} disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? "" : <p className={styles['no-margin-text']}>Нет добавленных элементов</p>}
				<ul className={styles.list}>
					{list.map(listItem => (
						<li className={styles['list-item']} key={listItem.id}>{listItem.value} <b>Дата создания:</b> <span>{listItem.date}</span></li>
					))}
				</ul>
			</div>
		</div>
	);
};
