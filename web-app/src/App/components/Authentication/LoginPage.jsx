import {ColorThema} from "../ProjectThema";

export const LoginPage = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col text-white font-bold text-center gap-6">
                <div className="text-7xl">
                    <span className={'font-bold underline'}> ‘기술 중시’란 </span>
                </div>

                <div className="text-6xl font-medium mb-8">
                    새로운 기술을 도입하는 것이 아니라
                </div>

                <div className="text-6xl font-medium">
                    기술이 실제 업무와 조직 속에서
                </div>

                <div className={`text-8xl text-blue-400`}>
                    <span className={'font-bold underline'}>가치를 발휘하도록 설계하는 것</span>
                </div>
            </div>
        </div>
    );
};
