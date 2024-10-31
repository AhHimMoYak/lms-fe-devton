import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios';
import '/src/styles/Mypage/CourseCreate.css';

function CreateLive() {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { data, fetchData } = useAxios();

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const requestData = {
            title,
            startTime: `${startTime}:00`, // 초를 추가하여 Java LocalDateTime과 일치시킴
        };
        fetchData(`/live?courseId=${courseId}`, "POST", requestData).then(() => {
            navigate(`/mypage/course/${courseId}/list`);
        }).catch((error) => {
            console.error('라이브 생성 실패:', error);
        });
    }, [title, startTime, courseId, fetchData, navigate]);

    return (
        <form className="create-live-form" onSubmit={handleSubmit}>
            <div className="create-live-form__input-group">
                <label className="create-live-form__label" htmlFor="title">라이브 제목</label>
                <input
                    type="text"
                    id="title"
                    className="create-live-form__input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="create-live-form__input-group">
                <label className="create-live-form__label" htmlFor="startTime">시작 시간</label>
                <input
                    type="datetime-local"
                    id="startTime"
                    className="create-live-form__input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            <button className="create-live-form__submit-button" type="submit">라이브 생성</button>
        </form>
    );
}

export default CreateLive;