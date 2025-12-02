// app/terms/page.tsx
import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">서비스 이용약관</h1>
                <p className="text-gray-500 mb-8">시행일: 2025년 12월 1일</p>

                <div className="prose prose-gray max-w-none space-y-8">
                    {/* 1. 목적 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
                        <p className="text-gray-700 leading-relaxed">
                            본 약관은 솔트(SALT, 이하 &quot;서비스&quot;)가 제공하는 YouTube 댓글 AI 분석 서비스의
                            이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    {/* 2. 정의 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-decimal list-inside text-gray-700 space-y-2">
                                <li><strong>&quot;서비스&quot;</strong>란 솔트가 제공하는 YouTube 댓글 감정 분석, 요약, 키워드 추출, 영상 검색, 스크랩, 관심 채널 등의 기능을 의미합니다.</li>
                                <li><strong>&quot;이용자&quot;</strong>란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</li>
                                <li><strong>&quot;회원&quot;</strong>이란 Google 계정으로 로그인하여 서비스의 회원 전용 기능을 이용하는 자를 의미합니다.</li>
                                <li><strong>&quot;비회원&quot;</strong>이란 로그인 없이 서비스를 이용하는 자를 의미합니다.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. 서비스 내용 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (서비스 내용)</h2>
                        <p className="text-gray-700 mb-4">
                            솔트는 유튜브 영상의 방대한 댓글을 AI로 분석해 요약, 감정, 논란 흐름 등
                            핵심만 간결하게 정리해주는 서비스입니다. 수많은 의견 속에서 본질만 남기는
                            &apos;소금&apos;처럼, 시청자와 크리에이터가 필요한 인사이트를 한눈에 확인할 수 있도록 돕습니다.
                        </p>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-3">3.1 주요 기능</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>YouTube 영상/쇼츠 검색</li>
                                <li>YouTube 채널 검색</li>
                                <li>댓글 감정 분석 (긍정/부정/기타, 세부 감정 태깅)</li>
                                <li>댓글 요약 및 키워드 추출</li>
                                <li>논란 감지 및 알림</li>
                                <li>댓글 시간대별 분포, 언어 분포 분석</li>
                                <li>인기 타임스탬프 추출</li>
                                <li>인기 검색어 제공</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-3">3.2 회원 전용 기능</h3>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>영상 스크랩 및 스크랩 목록 관리</li>
                                <li>관심 채널 등록 및 관리</li>
                                <li>관심 채널 최신 영상 분석</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. 이용계약 체결 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (이용계약 체결)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 비회원은 별도의 가입 절차 없이 서비스의 기본 기능을 이용할 수 있습니다.
                            </p>
                            <p>
                                ② 회원 가입은 Google 계정을 통한 로그인으로 이루어지며,
                                로그인 시 본 약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
                            </p>
                            <p>
                                ③ 서비스는 다음 각 호에 해당하는 경우 이용을 제한하거나 계정을 해지할 수 있습니다:
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 ml-4">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>타인의 정보를 도용한 경우</li>
                                    <li>서비스 운영을 방해하는 행위를 한 경우</li>
                                    <li>관련 법령 또는 본 약관을 위반한 경우</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 5. 서비스 이용 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (서비스 이용)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
                            </p>
                            <p>
                                ② 서비스는 무료로 제공됩니다.
                            </p>
                            <p>
                                ③ 서비스의 AI 분석 결과(감정 분석, 요약, 논란 감지 등)는 추정치이며,
                                100% 정확성을 보장하지 않습니다.
                            </p>
                            <p>
                                ④ 서비스 이용 시 YouTube API 서비스 약관 및 Google 개인정보처리방침이 함께 적용됩니다.
                            </p>
                        </div>
                    </section>

                    {/* 6. YouTube API 서비스 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (YouTube API 서비스)</h2>
                        <p className="text-gray-700 mb-4">
                            본 서비스는 YouTube API 서비스를 사용합니다.
                            서비스 이용 시 다음 약관에 동의하는 것으로 간주됩니다:
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>
                                    <a
                                        href="https://www.youtube.com/t/terms"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        YouTube 서비스 약관
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://policies.google.com/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Google 개인정보처리방침
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 7. 이용자의 의무 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (이용자의 의무)</h2>
                        <p className="text-gray-700 mb-4">이용자는 다음 행위를 하여서는 안 됩니다:</p>
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>타인의 정보를 도용하거나 허위 정보를 등록하는 행위</li>
                                <li>서비스의 운영을 방해하거나 안정성을 해치는 행위</li>
                                <li>자동화된 수단(봇, 스크래퍼 등)을 이용하여 과도하게 서비스에 접근하는 행위</li>
                                <li>서비스를 통해 얻은 정보를 무단으로 복제, 배포, 상업적으로 이용하는 행위</li>
                                <li>서비스를 이용하여 법령 또는 공서양속에 위반되는 행위</li>
                                <li>YouTube API 서비스 약관을 위반하는 행위</li>
                                <li>다른 이용자의 서비스 이용을 방해하는 행위</li>
                            </ul>
                        </div>
                    </section>

                    {/* 8. 서비스 제공의 제한 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (서비스 제공의 제한)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스는 다음 각 호의 경우 서비스 제공을 제한하거나 중단할 수 있습니다:
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 ml-4">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>시스템 정기점검, 긴급점검, 설비 증설 및 교체 등의 경우</li>
                                    <li>YouTube API 일일 할당량 초과 시</li>
                                    <li>YouTube API 서비스 장애 또는 변경의 경우</li>
                                    <li>천재지변, 국가비상사태 등 불가항력적 사유가 발생한 경우</li>
                                    <li>이용자가 본 약관을 위반한 경우</li>
                                </ul>
                            </div>
                            <p>
                                ② YouTube API 일일 할당량 초과 시 당일 서비스 이용이 제한될 수 있으며,
                                할당량은 매일 자정(태평양 표준시 기준)에 초기화됩니다.
                            </p>
                            <p>
                                ③ 서비스는 전항에 따른 서비스 제한 시 가능한 한 사전에 공지합니다.
                                다만, 긴급한 경우에는 사후에 공지할 수 있습니다.
                            </p>
                        </div>
                    </section>

                    {/* 9. 콘텐츠의 저작권 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (콘텐츠의 저작권)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스가 제공하는 AI 분석 결과, UI 디자인, 로고 등의 저작권은 서비스에 귀속됩니다.
                            </p>
                            <p>
                                ② YouTube 영상, 댓글, 채널 정보 등 YouTube 콘텐츠의 저작권은
                                해당 콘텐츠의 원 저작권자 및 YouTube에 있습니다.
                            </p>
                            <p>
                                ③ 이용자는 서비스를 통해 얻은 정보를 서비스의 사전 승낙 없이
                                상업적으로 이용하거나 제3자에게 제공할 수 없습니다.
                            </p>
                        </div>
                    </section>

                    {/* 10. 면책조항 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (면책조항)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스는 AI 기반 분석 결과(감정 분석, 요약, 논란 감지 등)의 정확성을 보장하지 않습니다.
                                분석 결과는 참고용으로만 사용되어야 하며,
                                이를 근거로 한 의사결정에 대해 서비스는 책임지지 않습니다.
                            </p>
                            <p>
                                ② 서비스는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
                            </p>
                            <p>
                                ③ 서비스는 YouTube API 서비스의 장애, 변경, 중단, 할당량 제한으로 인한
                                서비스 제한에 대하여 책임을 지지 않습니다.
                            </p>
                            <p>
                                ④ 서비스는 이용자가 서비스를 통해 얻은 정보를 이용하여 발생한
                                손해에 대하여 책임을 지지 않습니다.
                            </p>
                            <p>
                                ⑤ 서비스는 이용자 간 또는 이용자와 제3자 간의 분쟁에 대하여
                                개입하지 않으며 책임을 지지 않습니다.
                            </p>
                        </div>
                    </section>

                    {/* 11. 분쟁 해결 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (분쟁 해결)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스와 이용자 간에 발생한 분쟁에 대하여는 대한민국 법을 적용합니다.
                            </p>
                            <p>
                                ② 서비스 이용과 관련하여 발생한 분쟁에 대해서는
                                대전지방법원을 제1심 전속관할법원으로 합니다.
                            </p>
                        </div>
                    </section>

                    {/* 12. 약관의 변경 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (약관의 변경)</h2>
                        <div className="text-gray-700 space-y-4">
                            <p>
                                ① 서비스는 필요한 경우 본 약관을 변경할 수 있으며,
                                변경된 약관은 서비스 내 공지사항을 통해 공지합니다.
                            </p>
                            <p>
                                ② 변경된 약관은 공지한 날로부터 7일 후 효력이 발생합니다.
                            </p>
                            <p>
                                ③ 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
                            </p>
                            <p>
                                ④ 변경된 약관 시행일 이후에도 서비스를 계속 이용하는 경우
                                변경된 약관에 동의한 것으로 간주합니다.
                            </p>
                        </div>
                    </section>

                    {/* 13. 연락처 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제13조 (연락처)</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">
                                <strong>서비스명:</strong> 솔트 (SALT)<br />
                                <strong>운영팀:</strong> sosuso (국립공주대학교 캡스톤 프로젝트 팀)<br />
                                <strong>이메일:</strong> sosuso.capstone@gmail.com<br />
                                <strong>문의:</strong> 서비스 관련 문의사항은 위 이메일로 연락 주시기 바랍니다.
                            </p>
                        </div>
                    </section>

                    {/* 부칙 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">부칙</h2>
                        <p className="text-gray-700">
                            본 약관은 2025년 12월 1일부터 시행됩니다.
                        </p>
                    </section>
                </div>

                {/* 하단 링크 */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex justify-center space-x-6 text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-700">홈으로</Link>
                        <Link href="/privacy" className="hover:text-gray-700">개인정보처리방침</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}