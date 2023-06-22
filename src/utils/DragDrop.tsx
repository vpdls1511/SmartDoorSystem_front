// DragDrop.tsx
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";

const DragDropComp = styled.div`
  width: 100%;
	min-height: 200px;
	height: auto;
	border: 2px dashed #999;
	border-radius: 20px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface IFileTypes {
	id: number; // 파일들의 고유값 id
	object: File;
}


const DragDrop = (): JSX.Element => {
	// 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [files, setFiles] = useState<IFileTypes[]>([]);

	// 각 선택했던 파일들의 고유값 id
	const fileId = useRef<number>(0);

	// 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
	const dragRef = useRef<HTMLLabelElement | null>(null);

	const handleDragIn = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDragOut = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();

		setIsDragging(false);
	}, []);

	const handleDragOver = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer!.files) {
			setIsDragging(true);
		}
	}, []);

	const onChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement> | any): void => {
		let selectFiles: File[] = [];
		let tempFiles: IFileTypes[] = files;
		// temp 변수를 이용하여 선택했던 파일들을 담습니다.

		// 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
		if (e.type === "drop") {
			// 드래그 앤 드롭 했을때
			selectFiles = e.dataTransfer.files;
		} else {
			// "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
			selectFiles = e.target.files;
		}

		for (const file of selectFiles) {
			// 스프레드 연산자를 이용하여 기존에 있던 파일들을 복사하고, 선택했던 파일들을 append 해줍니다.
			tempFiles = [
				...tempFiles,
				{
					id: fileId.current++, // fileId의 값을 1씩 늘려주면서 각 파일의 고유값으로 사용합니다.
					object: file // object 객체안에 선택했던 파일들의 정보가 담겨있습니다.
				}
			];
		}

		setFiles(tempFiles);
	}, [files]); // 위에서 선언했던 files state 배열을 deps에 넣어줍니다.

	const handleDrop = useCallback(
		(e: DragEvent): void => {
			e.preventDefault();
			e.stopPropagation();

			onChangeFiles(e);
			setIsDragging(false);
		},
		[onChangeFiles]
	);

	const initDragEvents = useCallback((): void => {
		// 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

		if (dragRef.current !== null) {
			dragRef.current.addEventListener("dragenter", handleDragIn);
			dragRef.current.addEventListener("dragleave", handleDragOut);
			dragRef.current.addEventListener("dragover", handleDragOver);
			dragRef.current.addEventListener("drop", handleDrop);
		}
	}, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

	const resetDragEvents = useCallback((): void => {
		// 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

		if (dragRef.current !== null) {
			dragRef.current.removeEventListener("dragenter", handleDragIn);
			dragRef.current.removeEventListener("dragleave", handleDragOut);
			dragRef.current.removeEventListener("dragover", handleDragOver);
			dragRef.current.removeEventListener("drop", handleDrop);
		}
	}, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

	useEffect(() => {
		initDragEvents();

		return () => resetDragEvents();
	}, [initDragEvents, resetDragEvents]);

	return (
		<DragDropComp>
			<input
				type="file"
				id="fileUpload"
				style={{display: "none"}} // label을 이용하여 구현하기에 없애줌
				multiple={true} // 파일 다중선택 허용
			/>

			<label
				className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
				htmlFor="fileUpload"
				ref={dragRef}
			>
				도면을 드래그 해 주세요.
			</label>
		</DragDropComp>
	);
}

export default DragDrop;
