import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    header: {
                        lg: 'RU',
                        search: 'Search...',
                        login: 'Login',
                        signUp: 'Sign Up',
                        logout: 'Logout',
                        admin: 'Admin panel',
                        home: 'Home'
                    },
                    login: {
                        google: 'Sign in with Google',
                        gh: 'Sign in with GitHub',
                        or: 'or',
                        email: 'Email',
                        password: 'Password',
                    },
                    signUp: {
                        or: 'or',
                        username: 'Username',
                        signUp: 'Sign Up',
                        email: 'Email',
                        password: 'Password',
                        confirmPassword: 'Confirm password',
                    },
                    tags: {
                        tagsSearch: 'Tags search...',
                        apply: 'Apply',
                        reset: 'Reset'
                    },
                    main: {
                        latest: "Latest reviews",
                        highGrade: " High grade from the author",
                        rateInfo: ' To rate the review, go to the review page...'
                    },
                    review: {
                        authorGrade: 'Author grade',
                        averageRating: 'Average rating of the review',
                        notFound: 'Not found',
                        comments: 'Comments',
                        sendComment: 'Send comment',
                        writeComment: 'Write comment…',
                        send: 'Send',
                        update: 'Update',
                        cancel: 'Cancel',
                        noReview: 'No reviews'
                    },
                    reviewTable: {
                        rTitle: 'Review title',
                        wTitle: 'Work title',
                        aGrade: 'Author\'s grade',
                        rating: 'Rating',
                        likesComments: 'Likes, comments',
                        createdAt: 'Created at',
                        all: 'all',
                        open: 'Open'
                    },
                    admin: {
                        username: 'Username',
                        email: 'Email'
                    },
                    createReview: {
                        first: 'Create first review...',
                        new: 'New Review',
                        rTitle: 'Review title',
                        wTitle: "Work title",
                        rText: 'Review text',
                        grade: 'Grade',
                        create: 'Create',
                        tags: 'Tags',
                        gradeInfo: 'Grade of the work (from 1 to 10)'
                    },
                    updateReview: {
                        update: 'Update',
                        upReview: 'Update review',
                    },
                    uploadImg: {
                        delete: 'Delete',
                        toBig: 'The file is too large!',
                        release: 'Release to upload image',
                        drag: 'Drag and drop file',
                        or: 'or',
                        browse: 'Browse file'
                    },
                    delete: {
                        delete: 'Delete',
                        cancel: 'Cancel',
                        publish: 'publication'
                    }


                    // here we will place our translations...
                }
            },
            ru: {
                translation: {
                    header: {
                        lg: 'АНГ',
                        search: 'Поиск...',
                        login: 'Войти',
                        signUp: 'Регистрация',
                        logout: 'Выйти',
                        admin: 'Админка',
                        home: 'Главная'
                    },
                    login: {
                        google: 'Войти с аккаунтом Google',
                        gh: 'Войти с аккаунтом GitHub',
                        or: 'или',
                        email: 'Почта',
                        password: 'Пароль',
                    },
                    signUp: {
                        or: 'или',
                        username: 'Имя пользователя',
                        signUp: 'Зарегистрироваться',
                        email: 'Почта',
                        password: 'Пароль',
                        confirmPassword: 'Подтвердите пароль',
                    },
                    tags: {
                        tagsSearch: 'Поиск по тегам...',
                        apply: 'Применить',
                        reset: 'Сбросить'
                    },
                    main: {
                        latest: "Последние обзоры",
                        highGrade: "Обзоры с наивысшей оценкой от автора",
                        rateInfo: 'Чтобы оценить обзор, перейдите на страницу обзора...'
                    },
                    review: {
                        authorGrade: 'Оценка автора',
                        averageRating: 'Общий рейтинг обзора',
                        notFound: 'Не найдено',
                        comments: 'Комментарии',
                        sendComment: 'Отправить комментарий',
                        writeComment: 'Напишите комментарий…',
                        send: 'Отправить',
                        update: 'Редактировать',
                        cancel: 'Отмена',
                        noReview: 'Обзоров нет'
                    },
                    reviewTable: {
                        rTitle: 'Название обзора',
                        wTitle: 'Название произведения',
                        aGrade: 'Оценка автора',
                        rating: 'Рейтинг',
                        likesComments: 'Лайки, комментарии',
                        createdAt: 'Дата создания',
                        all: 'все',
                        open: 'Открыть'

                    },
                    admin: {
                        username: 'Имя пользователя',
                        email: 'Почта',

                    },
                    createReview: {
                        first: 'Создайте первый обзор...',
                        new: 'Новый обзор',
                        rTitle: 'Название обзора',
                        wTitle: "Название произведения",
                        rText: 'Текст обзора',
                        grade: 'Оценка произведения',
                        create: 'Создать',
                        tags: 'Теги',
                        gradeInfo: 'Оценка произведения (от 1 до 10)'
                    },
                    updateReview: {
                        update: 'Редактировать',
                        upReview: 'Редактировать обзор',

                    },
                    uploadImg: {
                        delete: 'Удалить',
                        toBig: 'Файл слишком большого размера',
                        release: 'Отпустите, чтобы загрузить изображение',
                        drag: 'Перетащите файл',
                        or: 'ИЛИ',
                        browse: 'Загрузить файл'
                    },
                    delete: {
                        delete: 'Удалить',
                        cancel: 'Отмена',
                        publish: 'публикацию'
                    }
                    // here we will place our translations...
                }
            },
        }
    });

export default i18n;


