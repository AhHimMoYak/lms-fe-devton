import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Mypage/QnAEdit.css";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function QnAEdit() {
    const { courseBoardId } = useParams();
    const { courseId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { data, fetchData } = useAxios();
    const { data: updateData, fetchData: updateRetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/${courseId}/board/QNA/${courseBoardId}`, "GET");
    }, [courseBoardId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestDto = {
            title: title,
            content: content,
        };
        console.log(requestDto);

        updateRetchData(`/course/${courseId}/board/${courseBoardId}`, "PATCH", requestDto);
    };

    const handleList = () => {
        if (decodeTokenTutor()) {
            navigate(`/education/course/${courseId}/qna/${courseBoardId}`);
        } else {
            navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
        }
    };

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
        }
    }, [data]);

    useEffect(() => {
        if (updateData) {
            alert(updateData);
            navigate(`/mypage/course/${courseId}/qna`);
        }
    }, [updateData]);

    if (!data) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="qna-container">
            <h2>Q&A 게시물 수정</h2>
            <form className="qna-form" onSubmit={handleSubmit}>
                <div className="title-box">
                    <input type="text" defaultValue={data.title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="qna-content-container">
                    <textarea className="content-box" defaultValue={data.content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit" className="qna-submit-button">
                    작성완료
                </button>
                <button className="qna-back-button" onClick={handleList}>
                    취소
                </button>
            </form>
        </div>
    );
}

export default QnAEdit;
