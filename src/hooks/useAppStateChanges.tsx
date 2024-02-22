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
import { ComponentType, useRef, useState } from 'react';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

type FormElementsType = {
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
		applyChanges(defaultArticleState);
		setState(defaultArticleState);
	};
	const applyState = (e?: React.MouseEvent<HTMLButtonElement>) => {
		if (e) e.preventDefault();
		applyChanges(state);
	};
	const applyChanges = (state: ArticleStateType) => {
		if (appRef.current) {
			appRef.current!.style.cssText = `
            --font-family: ${state.fontFamilyOption.value};
            --font-size: ${state.fontSizeOption.value};
            --font-color: ${state.fontColor.value};
            --container-width: ${state.contentWidth.value};
            --bg-color: ${state.backgroundColor.value};
        `;
		}
	};
	const [state, setState] = useState(defaultArticleState);
	const appRef = useRef<HTMLDivElement | null>(null);
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
		appRef,
		formElements,
		resetState,
		applyState,
		changeState,
	};
}
