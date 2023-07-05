// DragDrop.tsx
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {read} from "fs";

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
	overflow: hidden;
`

const PreviewImage = styled.img`
	width: 100%;
`

const DragDrop = (): JSX.Element => {
	// 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<any>('')

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
		let selectFile: File
		const reader = new FileReader()

		// 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
		if (e.type === "drop") {
			// 드래그 앤 드롭 했을때
			selectFile = e.dataTransfer.files[0];
		} else {
			// "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
			selectFile = e.target.files[0];
		}

		reader.onload = (e: ProgressEvent<FileReader>) => {
			console.log(e.target?.result)
			setImage(e.target?.result)
		}

		console.log(selectFile)
		reader.readAsDataURL(selectFile)

		console.log(selectFile)

		setFile(selectFile);
	}, [file]); // 위에서 선언했던 files state 배열을 deps에 넣어줍니다.

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
		<>
			<DragDropComp>
				<input
					type="file"
					id="fileUpload"
					style={{display: "none"}} // label을 이용하여 구현하기에 없애줌
					multiple={false} // 파일 다중선택 허용
				/>
				{
					file == null ?
						<label
							className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
							htmlFor="fileUpload"
							ref={dragRef}
						>
							클릭하거나 도면을 드래그하여 업로드 해 주세요.
						</label> :
						<PreviewImage src={image}>
						</PreviewImage>

				}
			</DragDropComp>

		</>
	);
}

export default DragDrop;
