// app/privacy/page.tsx
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
                <p className="text-gray-500 mb-8">시행일: 2025년 12월 1일</p>

                <div className="prose prose-gray max-w-none space-y-8">
                    {/* 1. 개요 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개요</h2>
                        <p className="text-gray-700 leading-relaxed">
                            솔트(SALT, 이하 &quot;서비스&quot;)는 유튜브 영상의 방대한 댓글을 AI로 분석해
                            요약, 감정, 논란 흐름 등 핵심만 간결하게 정리해주는 서비스입니다.
                            본 개인정보처리방침은 「개인정보 보호법」 및 관련 법령에 따라
                            서비스가 수집하는 개인정보의 항목, 수집 목적, 보관 기간 및
                            이용자의 권리에 대해 설명합니다.
                        </p>
                    </section>

                    {/* 2. 수집하는 개인정보 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>

                        <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">2.1 Google 로그인을 통해 수집하는 정보</h3>
                        <p className="text-gray-700 mb-3">
                            서비스는 Google OAuth 2.0을 통해 다음 정보를 수집합니다:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>이메일 주소</strong> (email)</li>
                                <li><strong>이름</strong> (name)</li>
                                <li><strong>프로필 사진 URL</strong> (picture)</li>
                                <li><strong>Google 계정 고유 식별자</strong> (sub) - 회원 식별용</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">2.2 서비스 이용 과정에서 수집되는 정보</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>영상 조회 기록</strong>: 조회한 영상 ID, 조회 시간, 사용자 ID</li>
                                <li><strong>스크랩 기록</strong>: 스크랩한 영상 정보</li>
                                <li><strong>관심 채널 목록</strong>: 등록한 채널 ID, 채널명, 썸네일</li>
                                <li><strong>검색 기록</strong>: 검색 키워드, 검색 시간 (사용자 식별 정보 없이 익명으로 수집)</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">2.3 수집하지 않는 정보</h3>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>YouTube 계정 접근 권한 (YouTube 로그인을 요청하지 않음)</li>
                                <li>이용자의 YouTube 시청 기록, 구독 목록, 재생목록</li>
                                <li>결제 정보, 주소, 전화번호 등 민감한 개인정보</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. 개인정보 수집 목적 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보 수집 및 이용 목적</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>회원 관리</strong>: 회원 식별, 로그인 서비스 제공, 중복 가입 방지</li>
                                <li><strong>맞춤 서비스 제공</strong>: 스크랩, 관심 채널, 조회 기록 기반 기능 제공</li>
                                <li><strong>서비스 개선</strong>: 인기 검색어 집계, 서비스 이용 통계 분석</li>
                                <li><strong>인기 영상 제공</strong>: 조회/스크랩 데이터 기반 인기 콘텐츠 추천</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. YouTube API 서비스 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. YouTube API 서비스 이용</h2>
                        <p className="text-gray-700 mb-4">
                            본 서비스는 YouTube API 서비스를 사용하여 공개된 영상 정보와 댓글을 수집합니다.
                        </p>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-3">4.1 YouTube API를 통해 수집하는 정보</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>공개된 YouTube 영상 정보 (제목, 조회수, 좋아요 수, 썸네일 등)</li>
                                <li>공개된 YouTube 채널 정보 (채널명, 구독자 수, 썸네일 등)</li>
                                <li>공개된 YouTube 댓글 (댓글 내용, 작성자명, 좋아요 수, 작성일)</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-3">4.2 관련 정책</h3>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-gray-700 mb-2">YouTube API 서비스 이용 시 다음 정책이 적용됩니다:</p>
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

                        <p className="text-gray-700 mt-4">
                            서비스는 YouTube 이용자의 비공개 정보에 접근하지 않으며,
                            공개적으로 게시된 정보만을 수집하여 감정 분석 서비스를 제공합니다.
                        </p>
                    </section>

                    {/* 5. AI 서비스 이용 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. AI 서비스 이용</h2>
                        <p className="text-gray-700 mb-4">
                            서비스는 댓글 분석을 위해 AI 서비스를 활용합니다:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>댓글 감정 분석</strong>: 긍정/부정/기타 분류 및 세부 감정 태깅</li>
                                <li><strong>댓글 요약</strong>: 전체 댓글의 핵심 내용 요약</li>
                                <li><strong>키워드 추출</strong>: 주요 키워드 및 논란 감지</li>
                                <li><strong>키워드 설명</strong>: 검색 키워드의 의미 설명</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mt-4">
                            AI 분석 과정에서 이용자의 개인정보는 전송되지 않으며,
                            공개된 YouTube 댓글 내용만이 분석에 사용됩니다.
                        </p>
                    </section>

                    {/* 6. 개인정보 보관 기간 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보 보관 및 파기</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-3">
                                <li>
                                    <strong>회원 정보</strong>: 회원 탈퇴 시 즉시 삭제
                                </li>
                                <li>
                                    <strong>스크랩/관심채널</strong>: 회원 탈퇴 시 또는 개별 삭제 요청 시 삭제
                                </li>
                                <li>
                                    <strong>영상 조회 기록</strong>: 일정 기간 보관 후 자동 삭제 (인기 영상 집계 목적)
                                </li>
                                <li>
                                    <strong>검색 기록</strong>: 익명으로 수집되며, 인기 검색어 집계 후 원본 삭제
                                </li>
                                <li>
                                    <strong>삭제 요청 시</strong>: 요청일로부터 30일 이내 처리
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 7. 개인정보 제3자 제공 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보 제3자 제공</h2>
                        <p className="text-gray-700 mb-4">
                            서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                            다만, 다음의 경우에는 예외로 합니다:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>이용자가 사전에 동의한 경우</li>
                                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차에 따라 요청이 있는 경우</li>
                            </ul>
                        </div>
                    </section>

                    {/* 8. 이용자의 권리 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 이용자의 권리</h2>
                        <p className="text-gray-700 mb-4">
                            이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
                        </p>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li><strong>열람권</strong>: 본인의 개인정보 처리 현황을 열람할 수 있습니다.</li>
                                <li><strong>정정권</strong>: 부정확한 개인정보의 정정을 요청할 수 있습니다.</li>
                                <li><strong>삭제권</strong>: 개인정보의 삭제를 요청할 수 있습니다.</li>
                                <li><strong>처리정지권</strong>: 개인정보 처리의 정지를 요청할 수 있습니다.</li>
                                <li><strong>동의 철회권</strong>: 개인정보 수집 및 이용 동의를 철회할 수 있습니다.</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mt-4">
                            권리 행사는 아래 연락처로 요청하시면 30일 이내에 처리해드립니다.
                        </p>
                    </section>

                    {/* 9. Google 계정 권한 관리 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Google 계정 권한 관리</h2>
                        <p className="text-gray-700 mb-4">
                            이용자는 Google 계정 보안 설정에서 본 서비스에 부여한 권한을
                            언제든지 철회할 수 있습니다:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <a
                                href="https://security.google.com/settings/security/permissions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Google 계정 권한 관리 페이지 바로가기 →
                            </a>
                        </div>
                        <p className="text-gray-700 mt-4">
                            권한 철회 시 서비스 로그인이 불가능해지며,
                            이는 회원 탈퇴와 동일하게 처리됩니다.
                        </p>
                    </section>

                    {/* 10. 개인정보 보호책임자 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. 개인정보 보호책임자 및 연락처</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">
                                <strong>서비스명:</strong> 솔트 (SALT)<br />
                                <strong>운영팀:</strong> sosuso (국립공주대학교 캡스톤 프로젝트 팀)<br />
                                <strong>이메일:</strong> sosuso.capstone@gmail.com<br />
                                <strong>문의:</strong> 개인정보 관련 문의사항은 위 이메일로 연락 주시기 바랍니다.
                            </p>
                        </div>
                    </section>

                    {/* 11. 개인정보처리방침 변경 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">11. 개인정보처리방침 변경</h2>
                        <p className="text-gray-700">
                            본 개인정보처리방침은 법령 또는 서비스 정책의 변경에 따라 수정될 수 있습니다.
                            변경 시 서비스 내 공지사항을 통해 안내드리며,
                            변경된 방침은 공지한 날로부터 7일 후 효력이 발생합니다.
                        </p>
                    </section>
                </div>

                {/* 하단 링크 */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex justify-center space-x-6 text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-700">홈으로</Link>
                        <Link href="/terms" className="hover:text-gray-700">서비스 이용약관</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}