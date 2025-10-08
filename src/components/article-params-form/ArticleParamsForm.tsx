import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideSidebarClickClose } from './hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	articleState: ArticleStateType; // или более конкретный тип
	setArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState(articleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useOutsideSidebarClickClose({
		isOpen,
		sidebarRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<div ref={sidebarRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
					</div>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='Шрифт'
						onChange={(selectedOption: OptionType) => {
							setFormState({
								...formState,
								fontFamilyOption: selectedOption,
							});
						}}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => {
							setFormState({
								...formState,
								fontSizeOption: option,
							});
						}}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='Цвет шрифта'
						onChange={(selectedOption: OptionType) => {
							setFormState({
								...formState,
								fontColor: selectedOption,
							});
						}}
					/>
					<div className={styles.dividingLine} />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={(selectedOption: OptionType) => {
							setFormState({
								...formState,
								backgroundColor: selectedOption,
							});
						}}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='Ширина контента'
						onChange={(selectedOption: OptionType) => {
							setFormState({
								...formState,
								contentWidth: selectedOption,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
