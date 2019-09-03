import { insertSentenceHTML,user } from "./utils.js";

// const user = ['kkw01234'];

export const register = {
    makeRegisterForm() {
        return (function () {
            return `
            <header>회원가입</header>
        <div id="register-container">
        <form action="" name="register" method="get" id="registerForm">
        <div class="input-container">
            <p>아이디</p>
            <div class="inputText">
                <input type="text" name="id">
            </div>
            <div id="nameError"></div>
        </div>
        <div class="input-container">
            <p>패스워드</p>
            <div class="inputText">
                <input type="password" name="password">
            </div>
            <div id="passwordError"></div>
        </div>
        <div class="input-container">
            <p>비밀번호 재확인</p>
            <div class="inputText">
                <input type="password" name="reconfirmationPassword">
            </div>
            <div id="reconfirmationPasswordError"></div>
        </div>
        <div class="input-container">
            <p>이름</p>
            <div class="inputText">
                <input type="text" name="name">
            </div>
            <div id="nameError"></div>
        </div>
        <div class="input-container">
            <p>생년월일</p>
            <div class="inputText">
                <input type="text" name="birthYear" placeholder="년(6자)">
                <select name="birthMonth">
                    <option value="">월</option>
                </select>
                <input type="text" name="birthDate" placeholder="일">
            </div>
            <div id="birthError"></div>
        </div>
        <div class="input-container">
            <p>성별</p>
            <div class="inputText">
                <select name="gender">
                    <option value="">성별</option>
                    <option value="male">남</option>
                    <option value="female">여</option>
                </select>
            </div>
        </div>
        <div class="input-container">
            <p>이메일</p>
            <div class="inputText">
                <input type="email" name="email">
            </div>
            <div id="emailError"></div>
        </div>
        <div class="input-container">
            <p>휴대전화</p>
            <div class="inputText">
                <input type="text" name="phone">
            </div>
            <div id="phoneError"></div>
        </div>
        <div class="input-container">
            <p>관심사</p>
            <div class="tags-input">
                <input type="interests" name="interests">
            </div>
            <div id="interestsError"></div>
        </div>
        <div class="terms-container">
            <span> 약관에 동의합니다.</span>
            <input type="checkbox" name="terms" disabled="disabled">
        </div>
        <div class="btn-container">
            <button type="button" class="btn btn-middle" id="initialization-button">초기화</button>
            <button type="button" class="btn btn-middle" id="register-button">가입하기</input>
        </div>
        </form>
    </div>
    <div id="register-modal" class="modal">
        <div class="modal-content">
           
        </div>
    </div>
    `
        })();
    },

    id: {
        init() {
            let idchecking = false;

            const idform = document.querySelector("input[name=id]");
            const errordiv = document.querySelector("#nameError");
            idform.addEventListener("input", () => {
                idchecking = false;
                const sentence = this.checkId(idform.value);
                if (sentence === "") {
                    idchecking = true;
                    insertSentenceHTML(errordiv, "사용가능한 아이디입니다.", "green");
                    return;
                }
                insertSentenceHTML(errordiv, sentence, "red");
            });
            this.clearIdForm = () => {
                idform.value = "";
                insertSentenceHTML(errordiv, "");
                idchecking = false;
            }
            this.getId = () => {
                if (idchecking)
                    return idform.value;
                return false;
            }
        },
        checkId(value) {

            if (!this.checkAvailableId(value)) {
                return ` 5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.`;
            }
            if (!this.findUser(value)) {
                return `이미사용중인 아이디 입니다.`;
            }
            return "";

        },
        checkAvailableId(id) {
            if (id.length < 5) {
                return false;
            }
            const regular = /[_0-9a-zA-z-]*/;
            const result = id.replace(regular, "");
            if (result.length === 0) {
                return true;
            } else return false;
        },
        findUser(id) {
            return user.every((value) => {
                return id !== value;
            });
        },

    },
    password: {
        init() {
            let passwordChecking, reconfirmationPasswordChecking;
            const passwordform = document.querySelector("input[name=password]");
            const reconfirmationPasswordform = document.querySelector("input[name=reconfirmationPassword]");
            const passwordError = document.querySelector("#passwordError");
            const reconfirmationPasswordError = document.querySelector("#reconfirmationPasswordError");
            passwordform.addEventListener("input", () => {
                passwordChecking = false;
                insertSentenceHTML(reconfirmationPasswordError, "");
                const sentence = this.checkPassword(passwordform.value);
                insertSentenceHTML(passwordError, sentence == "" ? " 안전한 비밀번호입니다." : sentence, sentence == "" ? "green" : "red");
                if (sentence == "") {
                    passwordChecking = true;
                    insertSentenceHTML(passwordError, "안전한 비밀번호입니다.", "green");
                } else {
                    insertSentenceHTML(passwordError, sentence, "red");
                }
            });
            reconfirmationPasswordform.addEventListener("input", () => {
                reconfirmationPasswordChecking = false;
                const result = this.checkReconfirmationandPassword(passwordform.value, reconfirmationPasswordform.value)
                if (result) {
                    reconfirmationPasswordChecking = true;
                    insertSentenceHTML(reconfirmationPasswordError, "비밀번호가 일치합니다.", "green");
                } else
                insertSentenceHTML(reconfirmationPasswordError, "비밀번호가 일치하지 않습니다.", "red");
            });
            this.clearPasswordForm = () => {
                passwordform.value = "";
                reconfirmationPasswordform.value = "";
                insertSentenceHTML(passwordError, "");
                insertSentenceHTML(reconfirmationPasswordError, "");
                passwordChecking = false;
            };
            this.getPassword = () => {
                if (passwordChecking && reconfirmationPasswordChecking) {
                    return passwordform.value;
                }
                return false;
            }
        },
        checkPassword(value) {
            if (value.length < 8) {
                return `8자 이상 16자 이하로 입력해주세요.`;
            }
            let regExp = /[A-Z]/;
            let result = regExp.test(value);
            if (!result) {
                return `영문 대문자를 최소 1자 이상 포함해주세요. `;
            };
            regExp = /[0-9]/;
            result = regExp.test(value);
            if (!result) {
                return `숫자를 최소 1자 이상 포함해주세요.`;
            }
            regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
            result = regExp.test(value);
            if (!result) {
                return `특수문자를 최소 1자 이상 포함해주세요.`;
            }
            return ``;
        },
        checkReconfirmationandPassword(password, reconfirmationPassword) {

            if (password === reconfirmationPassword) {
                return true;
            }
            return false;
        },


    },
    registerName: {
        init() {
            const nameForm = document.querySelector('input[name=name]');
            this.clearNameForm = () => {
                nameForm.value = "";
            }
            this.getName = () => {
                if (nameForm.value == "") {
                    return false;
                }
                return nameForm.value;
            }
        }
    },
    birth: {
        init() {
            let yearChecking, monthChecking, dateChecking;
            const birthYearform = document.querySelector('input[name=birthYear]');
            const birthMonthform = document.querySelector('Select[name=birthMonth]');
            const birthDateform = document.querySelector('input[name=birthDate]');
            const errordiv = document.querySelector('#birthError');
            for (let i = 1; i <= 12; i++) {
                birthMonthform.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`)
            }
            birthYearform.addEventListener("input", () => {
                yearChecking = false;
                const sentence = this.checkBirthYear(birthYearform.value);
                insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
                if (sentence == "") {
                    yearChecking = true;
                    const monthSentence = this.checkBirthYear(birthYearform.value);
                    const dateSentence = this.checkBirthDate(birthYearform.value, birthMonthform.value, birthDateform.value);
                    if (!(monthSentence === '')) {
                        insertSentenceHTML(errordiv, monthChecking, "red");
                        monthChecking = false;
                    } else if (!(dateSentence === '')) {
                        insertSentenceHTML(errordiv, dateSentence, "red");
                        dateChecking = false;
                    }
                }

            });
            birthMonthform.addEventListener("input", () => {
                monthChecking = false;
                const sentence = this.checkBirthMonth(birthMonthform.value);
                console.log(birthMonthform.value);
                insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
                if (sentence === "") {
                    monthChecking = true;
                    const yearSentence = this.checkBirthYear(birthYearform.value);
                    const dateSentence = this.checkBirthDate(birthYearform.value, birthMonthform.value, birthDateform.value);
                    console.log(dateSentence);
                    if (!(yearSentence === '')) {
                        yearChecking = false;
                        insertSentenceHTML(errordiv, yearSentence, "red");
                    } else if (!(dateSentence === '')) {
                        dateChecking = false;
                        insertSentenceHTML(errordiv, dateSentence, "red");
                    }

                }
            });
            birthDateform.addEventListener("input", () => {
                dateChecking = false;
                const sentence = this.checkBirthDate(birthYearform.value, birthMonthform.value, birthDateform.value);
                insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
                if (sentence == "") {
                    dateChecking = true;
                }
            });
            this.clearBirthForm = () => {
                birthYearform.value = "";
                birthMonthform.value = "";
                birthDateform.value = "";
                insertSentenceHTML(errordiv, "");
                yearChecking = false;
                monthChecking = false;
                dateChecking = false;
            }
            this.getBirth = () => {
                if (yearChecking && monthChecking && dateChecking) {
                    return [birthYearform.value, birthMonthform.value, birthDateform.value];
                }
                return false;
            }
        },
        checkBirthYear(year) {
            if (year.length !== 4) {
                return "태어난 년도 4자리를 정확하게 입력하세요";
            }
            const date = new Date().getFullYear();
            if (date - year < 15 || date - year > 99) {
                return "15세 이상 99세 이하일 경우만 회원가입 하실 수 있습니다.";
            }
            return "";
        },
        checkBirthMonth(month) {
            if (month == "") {
                return "월을 선택해주세요";
            }
            return "";
        },
        checkBirthDate(year, month, date) {
            if (year.length !== 4) {
                return "태어난 년도 4자리를 정확하게 입력하세요";
            }
            if (date < 0) {
                return `정확히 입력해주세요`;
            }
            switch (month * 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if (date > 31) {
                        return `${month}월은 31일까지 있습니다.`;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if (date > 30) {
                        return `${month}월은 30일까지 있습니다.`;
                    }
                    break;
                case 2:
                    if (this.checkLeapYear(year)) {
                        if (date > 29) {
                            return `${year}년 ${month}월은 29일까지 있습니다.`;
                        }
                    }
                    if (date > 28) {
                        return `${year}년 ${month}월은 28일까지 있습니다.`;
                    }
                    break;
                default:
                    console.log(month)
                    return `월을 선택해주세요`;
            }
            return ``;
        },
        checkLeapYear(year) {
            if (year % 4) {
                if (year % 100) {
                    if (year % 400) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }

    },
    gender: {
        init() {
            const genderform = document.querySelector("select[name=gender]");
            this.clearGenderform = () => {
                genderform.value = "";

            }
            this.getGender = () => {
                if (genderform.value !== "")
                    return genderform.value;
                return false;
            }
        }
    },
    email: {
        init() {
            let emailChecking = false;
            const emailform = document.querySelector("input[name=email]");
            const errordiv = document.querySelector("#emailError");
            emailform.addEventListener("input", () => {
                emailChecking = false;

                const sentence = this.checkEmail(emailform.value);
                insertSentenceHTML(errordiv, sentence, sentence == "" ? "black" : "red");
                if (sentence === "") {
                    emailChecking = true;
                }
            });
            this.clearEmailForm = () => {
                emailform.value = "";
                insertSentenceHTML(errordiv, "");
                emailChecking = false;
            };
            this.getEmail = () => {
                if (emailChecking) {
                    return emailform.value;
                }
                return false;
            };
        },
        checkEmail(email) {
            const regExp = /[^@]+@[^@]+.[^@]+/;
            const result = regExp.test(email);
            return result ? "" : "이메일 주소를 확인하세요";
        }
    },
    phone: {

        init() {
            let phoneChecking = false;
            const phoneform = document.querySelector("input[name=phone]");
            const errordiv = document.querySelector("#phoneError");
            phoneform.addEventListener("input", () => {
                phoneChecking = false;
                const sentence = this.checkPhone(phoneform.value);
                insertSentenceHTML(errordiv, sentence, sentence === "" ? "black" : "red");
                if (sentence === "") {
                    phoneChecking = true;
                }
            });
            this.clearPhoneForm = () => {
                phoneform.value = "";
                insertSentenceHTML(errordiv, "");
                phoneChecking = false;
            };
            this.getPhone = () => {
                if (phoneChecking) {
                    return phoneform.value;
                }
                return false;
            }
        },
        checkPhone(phone) {
            if (phone.length < 10 || phone.length > 11) {
                return "형식에 맞지 않는 번호입니다.";
            } else if (!(phone[0] * 1 === 0 && phone[1] * 1 === 1 && phone[2] * 1 === 0)) {
                return "형식에 맞지 않는 번호입니다.";
            }
            const regExp = /[0-9]+/;
            const result = regExp.test(phone);
            console.log(result);
            return result ? "" : "형식에 맞지 않는 번호입니다.";
        }
    },
    interests: {
        init() {
            this.interestList = [];
            let checking = false;
            const interestTag = document.querySelector(".tags-input");
            const interestForm = document.querySelector("input[name=interests]");
            interestForm.addEventListener('keydown', (e) => {
                if (!checking && e.keyCode == 8 && interestTag.children.length > 1) {
                    interestTag.removeChild(interestTag.children[interestTag.children.length - 2]);
                    this.interestList.pop();
                    console.log(this.interestList);
                    if (!this.checkInterests()) {
                        insertSentenceHTML(document.querySelector("#interestsError"), "관심사를 3개이상 입력해주세요", "red");
                    } else
                        insertSentenceHTML(document.querySelector('#interestsError'), "");

                }
            });
            interestForm.addEventListener("input", (e) => {

                if (e.keyCode == 8) return;
                if (interestForm.value.length === 0) {
                    checking = false;
                    return;
                }
                checking = true;
                const result = this.checkComma(interestForm.value);
                if (result === "removeComma") {
                    interestForm.value = "";
                } else if (result) {
                    const span = document.createElement('span');
                    span.classList.add("tag");
                    span.textContent = interestForm.value.split(",")[0];
                    this.interestList.push(span.textContent);
                    span.appendChild(this.makeClose(span));
                    interestTag.insertBefore(span, interestForm);
                    interestForm.value = "";
                    checking = false;
                    if (!this.checkInterests()) {
                        insertSentenceHTML(document.querySelector("#interestsError"), "관심사를 3개이상 입력해주세요", "red");
                    } else
                    insertSentenceHTML(document.querySelector('#interestsError'), "");
                }
            });
        },
        checkComma(value) {
            const splitValue = value.split(",");
            if (splitValue.length >= 2 && splitValue[0] !== "") {
                return splitValue[0];
            } else if (splitValue[0] == "") {
                return "removeComma";
            }
            return "";
        },
        makeClose(span) {
            const closeButton = document.createElement("img");
            closeButton.style.width = "1em";
            closeButton.style.height = "1em";
            closeButton.setAttribute('src', './img/close.svg');
            closeButton.addEventListener("click", () => {
                const interestTag = document.querySelector(".tags-input");
                interestTag.removeChild(span);
            });
            return closeButton;
        },
        checkInterests() {
            if (this.interestList.length < 3) {
                return false;
            } else return true;
        },
        getInterests() {
            if (this.checkInterests()) {
                return this.interestList;
            } else return false;
        },
        clearInterests() {
            const interestTag = document.querySelector(".tags-input");
            while (interestTag.firstElementChild.className == 'tag') {
                interestTag.removeChild(interestTag.firstElementChild);
            }
        }
    }
    ,
    terms: {
        init() {
            const openingmodal = document.querySelector(".terms-container");
            const modal = document.querySelector(".modal");
            openingmodal.addEventListener("click", () => { //모달 띄우기
                const modalContent = document.querySelectorAll(".modal-content")[0];
                modalContent.className = "modal-content modal-large";
                modalContent.innerHTML = "";
                modal.style.display = "block";
                this.makeTerms(modalContent)


                const closingterms = modalContent.querySelector(".close");
                closingterms.addEventListener("click", () => {
                    modal.style.display = "none";
                });
                const termsArea = modalContent.querySelector(".terms");
                const termsButton = modalContent.querySelector("#terms-btn");
                termsButton.addEventListener("click", this.clickButton);

                termsArea.addEventListener("scroll", () => {
                    const scrollTop = termsArea.scrollTop;
                    const scrollHeight = termsArea.scrollHeight;
                    const offsetHeight = termsArea.offsetHeight;
                    if (scrollHeight - offsetHeight <= scrollTop) {
                        //button 활성화

                        termsButton.disabled = false;
                        termsButton.classList.remove("btn-disabled");
                    }
                });
            });
        },
        makeTerms(div) { //바꿔야함
            const closeDiv = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h4');
            const textarea = document.createElement('textarea');
            const btnContainer = document.createElement('div');
            const button = document.createElement('button');
            closeDiv.className = "close";
            img.src = "./img/close.svg";
            img.style.width = "20px";
            img.style.height = "20px";
            closeDiv.appendChild(img);
            title.textContent = "개인정보 수집 및 이용에 대한 안내";
            textarea.className = "terms";
            textarea.readOnly = true;
            textarea.textContent = `  정보통신망법 규정에 따라 부스트캠프에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
        
        1. 수집하는 개인정보의 항목
        최초 회원가입 당시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
        - 필수항목 : 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일, 휴대전화, 관심사
        
        2. 개인정보의 수집 및 이용 목적
        가. 컨텐츠 제공, 특정 맞춤 서비스 제공
        나. 회원제 서비스 제공, 개인식별, 부스트캠프 이용약관 위반 회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재
        
        3. 개인정보의 보유 및 이용기간
        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
        
        가. 회사 내부 방침에 의한 정보보유 사유
        - 부정이용기록(부정가입, 징계기록 등의 비정상적 서비스 이용기록)
        보존 항목 : 가입인증 휴대폰 번호
        보존 이유 : 부정 가입 및 이용 방지
        보존 기간 : 6개월
        ※ '부정이용기록'이란 부정 가입 및 운영원칙에 위배되는 게시글 작성 등으로 인해 회사로부터 이용제한 등을 당한 기록입니다.
        
        나. 관련법령에 의한 정보보유 사유
        상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다. 
        - 계약 또는 청약철회 등에 관한 기록
        보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
        보존 기간 : 5년
        - 소비자의 불만 또는 분쟁처리에 관한 기록
        보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
        보존 기간 : 3년
        - 웹사이트 방문기록
        보존 이유 : 통신비밀보호법
        보존 기간 : 3개월`;
            btnContainer.className = "btn-container";
            button.id = 'terms-btn';
            button.className = "btn btn-disabled btn-small";
            button.disabled = 'disabled';
            button.textContent = "가입";
            btnContainer.appendChild(button);

            div.appendChild(closeDiv);
            div.appendChild(title);
            div.appendChild(textarea);
            div.appendChild(btnContainer);


        },
        clickButton() {
            const termcheckbox = document.querySelector("input[name=terms]");
            const modal = document.querySelector(".modal");
            termcheckbox.checked = true;
            modal.style.display = "none";


        },
    }
    , initializationButton: {
        init() {
            const initialization = document.querySelector("#initialization-button");

            initialization.addEventListener("click", this.initializationListener);
        },
        initializationListener() {
            const modal = document.querySelector(".modal");
            const modalContent = document.querySelector(".modal-content");
            const p = document.createElement('p');
            p.textContent = "정말로 삭제하시겠습니까?";
            modalContent.innerHTML = "";
            modalContent.appendChild(p);
            const btnContainer = document.createElement('div');
            btnContainer.className = "btn-container";
            const deleteButton = document.createElement('button');
            const cancelButton = document.createElement('button');
            deleteButton.className = "btn btn-small";
            deleteButton.textContent = "삭제";
            deleteButton.addEventListener("click", registerForm.initializationButton.deleteAll);

            cancelButton.className = "btn btn-small";
            cancelButton.textContent = "취소";
            cancelButton.addEventListener("click", () => {
                modalContent.className = "modal-content modal-large";
                modal.style.display = 'none';
            });
            btnContainer.appendChild(deleteButton);
            btnContainer.appendChild(cancelButton);
            modalContent.appendChild(btnContainer);

            modalContent.className = "modal-content modal-small";
            modal.style.display = 'block';
            return false;
        },
        deleteAll() {
            const modal = document.querySelector(".modal");
            registerForm.id.clearIdForm();
            registerForm.password.clearPasswordForm();
            registerForm.registerName.clearNameForm();
            registerForm.birth.clearBirthForm();
            registerForm.gender.clearGenderform();
            registerForm.email.clearEmailForm();
            registerForm.phone.clearPhoneForm();
            registerForm.interests.clearInterests();
            document.querySelector("input[name=terms]").checked = false;
            modal.style.display = 'none';
        }
    },
    registerButton: {
        init() {
            const register = document.querySelector('#register-button');
            register.addEventListener("click", this.checkRegisterForm);
        },
    
        checkRegisterForm() {
            const modal = document.querySelector(".modal");
            const idValue = registerForm.id.getId();
            const passwordValue = registerForm.password.getPassword();
            const nameValue = registerForm.registerName.getName();
            const birthValue = registerForm.birth.getBirth();
            const genderValue = registerForm.gender.getGender();
            const emailValue = registerForm.email.getEmail();
            const phoneValue = registerForm.phone.getPhone();
            const interestsValue = registerForm.interests.getInterests();
            const checkTerm = document.querySelector("input[name=terms]").checked;
            const registerUser = {
                아이디: idValue,
                패스워드: passwordValue,
                이름: nameValue,
                생년월일: birthValue,
                셩별: genderValue,
                이메일: emailValue,
                휴대전화: phoneValue,
                관심사: interestsValue,
                약관: checkTerm
            }
            for (let key in registerUser) {

                if (!registerUser[key]) {
                    const modalContent = document.querySelector(".modal-content");
                    const content = document.createElement('p');
                    const btnContainer = document.createElement('div');
                    const button = document.createElement("button");
                    content.textContent = `${key}를(을) 확인해 주세요`;
                    btnContainer.className = "btn-container";
                    button.className = "btn btn-small";
                    button.textContent = "확인";
                    button.addEventListener("click", () => {
                        modalContent.innerHTML = "";
                        modal.style.display = "none";
                    });
                    modalContent.innerHTML = "";
                    btnContainer.appendChild(button);
                    modalContent.appendChild(content);
                    modalContent.appendChild(btnContainer);
                    modalContent.className = "modal-content modal-small";
                    modal.style.display = "block";
                    return false;
                }

            }


            const result = registerForm.registerButton.makeJSON(idValue, passwordValue, nameValue, birthValue, genderValue, emailValue, phoneValue, interestsValue, checkTerm);
            document.querySelector("#registerForm").submit();
            return true;
        },
        makeJSON(idValue, passwordValue, nameValue, birthValue, genderValue, emailValue, phoneValue, interestsValue) {
            return JSON.stringify({
                id: idValue,
                password: passwordValue,
                name: nameValue,
                birth: birthValue,
                gender: genderValue,
                email: emailValue,
                phone: phoneValue,
                interests: interestsValue,
            });
        }
    },
    init() {
        this.modal = document.querySelector(".modal");
        this.id.init();
        this.password.init();
        this.registerName.init();
        this.birth.init();
        this.gender.init();
        this.email.init();
        this.phone.init();
        this.interests.init();
        this.terms.init();
        this.registerButton.init();
        this.initializationButton.init();
    }

};
