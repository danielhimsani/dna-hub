import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceKissWinkHeart} from "@fortawesome/free-solid-svg-icons";

const RulesPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em;
  direction: rtl;
  width: 100%;
`;



export function RulesPages() {
    return (
        <RulesPageStyle>
            <h1> שלום לכולם!<FontAwesomeIcon icon={faFaceKissWinkHeart}/></h1>
            <span>
                מורשת ה-DNA היא מורשת רבת שנים שהתפתחה תוך כדי גדילה
                מטרת האתר הזה היא מימוש המורשת לכדי אתר ויזואלי נוח
                וממשק קליל למימוש המורשת.
            </span>
            <h3>מה זה עץ ה-DNA?</h3>
            <span>
                עץ ה-DNA הוא עץ אנשיפ המקושרים ע"י נשיקות.<br/>
                שורש העץ יהיה <b>דניאל הימסני</b>  מייסד  העץ ומפתח האתר<br/>
                כל שני אנשים אשר התבצעה בניהם נשיקה בפה ייתווספו לעץ ויתספו מקום יקר.
            </span>
            <h3>הגדרת נשיקה</h3>
            <span>
                <b>נשיקה</b> היא הצמדת שפתיים בין שני אנשים<br/>
                הנשיקה יכולה להיות קצרה וקולעת - <b>"פיקה"</b> <br/>
                או יכולה להיות ארוכה ותשוקתית - <b>"מזמוז"</b> <br/>
            </span>
            <h3>חוקי ה"המשכיות"</h3>
            <span>
                ישנם כמה חוקים מאוד פשוטים המגדירים את המשכיות השושלת בעץ: <br/><br/>
                <ul>
                    <li>
                        אם בן התנשק עם בן אבל לא לצורך תשוקה, ושני הצדדים לא נמשכים אחד לשני - הגורם המנושק יצטרף לעץ אבל לא יוכל להמשיך את העץ אחריו
                    </li>
                    <li>משמעות התשוקה היא משיכה מינית של הצדדים</li>
                    <li>נשיקה אשר בוצעה מצורך תשוקה יכולה להמשיך את השושלת בחופשיות</li>
                    <li>אם בן התנשק עם בת לצורך ושני הצדדים אכן נמשכים לצד השני - שושלת העץ תוכל להימשך כרגיל</li>
                    <li>אם בן התנשק עם בן אבל לא לצורך תשוקה, ושני הצדדים לא נמשכים אחד לשני - הגורם המנושק יצטרף לעץ אבל לא יוכל להמשיך את העץ אחריו</li>
                </ul>
            </span>

            <>
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n.tg  {border-collapse:collapse;border-spacing:0;}\n.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;\n  overflow:hidden;padding:10px 5px;word-break:normal;}\n.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;\n  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}\n.tg .tg-l82k{background-color:#67fd9a;border-color:inherit;color:#000000;text-align:left;vertical-align:top}\n.tg .tg-oq35{background-color:#333333;border-color:inherit;text-align:left;vertical-align:top}\n.tg .tg-jgml{background-color:#fd6864;border-color:inherit;color:#000000;text-align:left;vertical-align:top}\n"
                    }}
                />
                <table className="tg" style={{ tableLayout: "fixed", width: 424 }}>
                    <colgroup>
                        <col style={{ width: 61 }} />
                        <col style={{ width: 103 }} />
                        <col style={{ width: 84 }} />
                        <col style={{ width: 104 }} />
                        <col style={{ width: 72 }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th className="tg-oq35">גורם מנשק</th>
                        <th className="tg-oq35">בן אוהב בנים</th>
                        <th className="tg-oq35">בן אוהב בנות</th>
                        <th className="tg-oq35">בת אוהבת בנים</th>
                        <th className="tg-oq35">בת אוהבת בנות</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="tg-oq35">בן אוהב בנים</td>
                        <td className="tg-l82k">בן ייכנס לעץ ויוכל להמשיך שושלת</td>
                        <td className="tg-jgml">
                            בן ייכנס לעץ אך{" "}
                            <span style={{ fontWeight: "bold" }}>לא יוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-jgml">
                            בת תיכנס לעץ אך{" "}
                            <span style={{ fontWeight: "bold" }}>לא תוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-jgml">
                            בת תיכנס לעץ אך
                            <span style={{ fontWeight: "bold" }}> לא תוכל להמשיך שושלת</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-oq35">בן אוהב בנות</td>
                        <td className="tg-l82k">בן ייכנס לעץ ויוכל להמשיך שושלת</td>
                        <td className="tg-jgml">
                            בן ייכנס לעץ ו
                            <span style={{ fontWeight: "bold" }}>לא יוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-l82k">בת תיכנס לעץ ותוכל להמשיך שושלת</td>
                        <td className="tg-jgml">
                            בת תיכנס לעץ{" "}
                            <span style={{ fontWeight: "bold" }}>ולא תוכל להמשיך שושלת</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-oq35">בת אוהבת בנים</td>
                        <td className="tg-l82k">בן ייכנס לעץ ויוכל להמשיך שושלת</td>
                        <td className="tg-jgml">
                            בן ייכנס לעץ ו
                            <span style={{ fontWeight: "bold" }}>לא יוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-jgml">
                            בת תיכנס לעץ ו
                            <span style={{ fontWeight: "bold" }}>לא תוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-l82k">בת תיכנס לעץ ותוכל להמשיך שושלת</td>
                    </tr>
                    <tr>
                        <td className="tg-oq35">בת אוהבת בנות</td>
                        <td className="tg-jgml">
                            בן ייכנס לעץ אך{" "}
                            <span style={{ fontWeight: "bold" }}>לא יוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-jgml">
                            בן ייכנס לעץ אך{" "}
                            <span style={{ fontWeight: "bold" }}>לא יוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-jgml">
                            בת תיכנס לעץ אך{" "}
                            <span style={{ fontWeight: "bold" }}>לא תוכל להמשיך שושלת</span>
                        </td>
                        <td className="tg-l82k">בת תיכנס לעץ ותוכל להמשיך שושלת</td>
                    </tr>
                    </tbody>
                </table>
            </>

            <h3>לסיכום</h3>
            <span>
                עץ ה-DNA יכול להיות עסק מבלבל ומתיש, אבל הקפדה והתמדה יכולים להביא לרגעים מדהימים<br/>
                מוזמנים להוסיף ולהשפיע לעץ
                תהנו!
            </span>


        </RulesPageStyle>
    )
}