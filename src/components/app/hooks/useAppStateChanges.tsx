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
import { ComponentType, FormEvent, useState } from 'react';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

export type FormElementsType = {
	name?: string;
	title: string;
	stateName: keyof ArticleStateType;
	options: OptionType[];
	component: ComponentType<any>;
	separatorCount: number;
};
export function useAppStateChanges() {
	const changeState =
		(nameState: keyof ArticleStateType) =>
		(value: OptionType): void => {
			setState({ ...state, [nameState]: value });
		};
	const resetState = () => {
		setState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};
	const applyState = (e?: FormEvent) => {
		if (e) e.preventDefault();
		setAppliedState(state);
	};
	const [state, setState] = useState(defaultArticleState);
	const [appliedState, setAppliedState] = useState(defaultArticleState);
	const formElements: FormElementsType[] = [
		{
			title: 'Шрифт',
			stateName: 'fontFamilyOption',
			options: fontFamilyOptions,
			component: Select,
			separatorCount: 1,
		},
		{
			title: 'Размер шрифта',
			stateName: 'fontSizeOption',
			options: fontSizeOptions,
			component: RadioGroup,
			separatorCount: 1,
			name: 'fontSizeGroup',
		},
		{
			title: 'Цвет шрифта',
			stateName: 'fontColor',
			options: fontColors,
			component: Select,
			separatorCount: 1,
		},
		{
			title: 'Цвет фона',
			stateName: 'backgroundColor',
			options: backgroundColors,
			component: Select,
			separatorCount: 2,
		},
		{
			title: 'Ширина контента',
			stateName: 'contentWidth',
			options: contentWidthArr,
			component: Select,
			separatorCount: 1,
		},
	];
	return {
		state,
		appliedState,
		formElements,
		resetState,
		applyState,
		changeState,
	};
}
