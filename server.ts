import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables for local development (Vite handles the client env)
dotenv.config();
dotenv.config({ path: ".env.local" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chatbot
  app.post("/api/chat", async (req, res) => {
    let userMessage = "";
    let chatHistory: any[] = [];

    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "الرسالة مطلوبة" });
      }
      userMessage = message;
      chatHistory = history || [];

      // Rules-based smart fallback generator for Dalni Agency to handle missing keys or 403 blocks beautifully
      const getSmartFallbackResponse = (userMsg: string): string => {
        const msg = userMsg.toLowerCase().trim();

        // Maps / خرائط
        if (msg.includes("ترتيب") || msg.includes("نشاط") || msg.includes("خرائط") || msg.includes("خريطة") || msg.includes("الخرائط") || msg.includes("الخريطة") || msg.includes("GMB") || msg.includes("gmb") || msg.includes("ظهور")) {
          if (msg.includes("كيف") || msg.includes("طريقة")) {
            return `لتحسين ترتيب ملفك التجاري وتصدره على خرائط جوجل 📍، نقوم في وكالة **دلّني** بالخطوات التالية:
- **تحسين الملف الشخصي (Local SEO):** صياغة اسم النشاط والوصف بدقة وإضافة الكلمات المفتاحية الأكثر بحثاً.
- **التصنيفات الصحيحة:** تحديد التصنيف الأساسي والفرعي لنشاطك بعناية لمساعدة خوارزمية جوجل على فهم عملك.
- **إدارة التقييمات والمراجعات:** حصد تقييمات حقيقية من عملاء حقيقيين وتوجيه كتابة مراجعات تفاعلية لزيادة الترتيب.
- **التغطية الجغرافية:** استهداف الكلمات المرتبطة بالمنطقة الجغرافية المحيطة بك (مثل "بالقرب مني").

يمكننا بدء العمل فوراً لمضاعفة مبيعاتك عبر الخرائط! يمكنك التواصل معنا لحجز استشارتك المجانية. 📈`;
          }
          if (msg.includes("مراجعات") || msg.includes("مراجعة") || msg.includes("التقييم") || msg.includes("تقييم") || msg.includes("تقيم") || msg.includes("مراجعات")) {
            return `خدمة إدارة المراجعات والتقييمات من **دلّني** ⭐ تعمل كالتالي:
- نساعدك في حصد مراجعات إيجابية وحقيقية من عملاء حقيقيين لرفع تصنيف نشاطك.
- نقوم بصياغة تعليقات تحتوي على كلمات مفتاحية يبحث عنها عملاؤك لتعزيز أرشفة جوجل لملفك.
- نضع استراتيجية للرد على المراجعات السلبية وحلها بشكل احترافي يحافظ على هيبتك التجارية.
- زيادة التقييمات تساهم مباشرة في إقناع 90% من الزوار الجدد بالشراء منك! 

هل تود معرفة تفاصيل الباقات الخاصة بالتقييمات؟ 🚀`;
          }
          if (msg.includes("تضمنون") || msg.includes("ضمان") || msg.includes("تصدر")) {
            return `نحن في وكالة **دلّني** نضمن لك تحسناً ملموساً وواضحاً في ترتيب ظهورك على خرائط Google 🔍.
عملنا يعتمد على تطبيق معايير جوجل الرسمية بدقة (White-hat Local SEO)، مما يضمن استمرارية تصدرك بأمان كامل وبدون أي مخاطرة بإغلاق حسابك. 

نحن فخورون بمساعدة أكثر من 150 مشروع تجاري على تحقيق تصدر كامل لنتائج البحث المحلية. يسعدنا جداً أن نكون شريك نجاحك القادم! 🙏`;
          }
        }

        // Advertising campaigns / حملات إعلانية
        if (msg.includes("حملات") || msg.includes("إعلانات") || msg.includes("حملة") || msg.includes("إعلان") || msg.includes("منصات") || msg.includes("مربحة") || msg.includes("تقارير")) {
          if (msg.includes("منصات") || msg.includes("تديرونها") || msg.includes("فين") || msg.includes("انستقرام") || msg.includes("تيك")) {
            return `وكالة **دلّني** تدير حملات إعلانية احترافية ممولة عبر كبرى المنصات الرقمية لضمان أقصى وصول لجمهورك المستهدف 📣:
1. **Google Ads:** إعلانات شبكة البحث (Search Ads)، وإعلانات يوتيوب (YouTube Video Ads)، والإعلانات الصورية الموجهة.
2. **TikTok Ads:** إعلانات فيديو تفاعلية وجذابة للجمهور الشاب والنشط.
3. **Instagram & Facebook Ads:** حملات تواصل تفاعلية وزيادة للمبيعات المباشرة.
4. **Snapchat Ads:** ممتازة للمشاريع في دول الخليج والمملكة العربية السعودية.

نحن نختار لك المنصة الأنسب حسب طبيعة نشاطك وميزانيتك التسويقية! 🚀`;
          }
          if (msg.includes("مربحة") || msg.includes("تضمنون") || msg.includes("نجاح")) {
            return `لضمان تحقيق أعلى عائد على الاستثمار (ROI) لـ حملاتك الإعلانية المربحة 📈، نتبع منهجية علمية تشمل:
- **تحليل المنافسين:** دراسة السوق ومعرفة الكلمات الأكثر ربحية.
- **تحديد دقيق للجمهور:** استهداف اهتمامات وسلوكيات وفئات عمرية محددة.
- **تصميم إعلانات جذابة:** استخدام صور وفيديوهات ونصوص تحث العميل على اتخاذ قرار فوري.
- **إعادة الاستهداف (Remarketing):** لإقناع من زاروا موقعك بالشراء مجدداً.

دعنا نساعدك في إدارة حملاتك الإعلانية بذكاء لتجلب لك عملاء فعليين!`;
          }
          if (msg.includes("تقارير") || msg.includes("دورية")) {
            return `بكل تأكيد! نلتزم في **دلّني** بمبدأ الشفافية المطلقة مع عملائنا 📊:
- نوفر لك **تقارير دورية** تفصيلية وسهلة الفهم.
- تشمل التقارير: عدد النقرات، حجم الظهور، وعدد العملاء أو الاتصالات التي نتجت عن الإعلانات.
- نناقش معك التوصيات والتحسينات المقترحة لزيادة الكفاءة.

النتائج لدينا قابلة للقياس والتحليل دائماً!`;
          }
        }

        // Pricing / باقات وتسعير مخصص
        if (msg.includes("سعر") || msg.includes("أسعار") || msg.includes("اسعار") || msg.includes("باقة") || msg.includes("باقات") || msg.includes("بكم") || msg.includes("تكلفة") || msg.includes("طرق الدفع") || msg.includes("الدفع")) {
          return `مرحباً بك! نقدم في وكالة **دلّني** خططاً وعروضاً مخصصة تناسب حجم ونوع نشاطك التجاري بالضبط 🎯:
- يتم تحديد تفاصيل الخطة والعرض المالي بناءً على احتياجات مشروعك ونطاق العمل المطلوب.
- نقدم استشارة تسويقية مجانية بالكامل لفحص مشروعك وتقديم العرض الأنسب لك.
- **طرق الدفع المتاحة:** نقبل الدفع عبر فودافون كاش، إنستاباي (InstaPay)، التحويلات البنكية المباشرة، أو نقداً في مقر الوكالة.

للحصول على خطة وعرض مخصص لمشروعك، يسعدنا تواصلك معنا مباشرة عبر الواتساب! 🤝`;
        }

        // Booking / contact / تواصل وحجز
        if (msg.includes("تواصل") || msg.includes("اتصال") || msg.includes("تلفون") || msg.includes("رقم") || msg.includes("حجز") || msg.includes("استشارة") || msg.includes("مقر") || msg.includes("عنوان") || msg.includes("مستشار") || msg.includes("استفسار") || msg.includes("تلفون")) {
          if (msg.includes("مقر") || msg.includes("عنوان") || msg.includes("مكان") || msg.includes("مكتب")) {
            return `مقر وكالة **دلّني** للتسويق الرقمي 🏢 يقع في موقع متميز وسهل الوصول إليه. 
يسعدنا دائماً استقبالك لشرب القهوة ومناقشة تفاصيل مشروعك وجهاً لوجه! 

يمكنك كذلك التواصل معنا بالكامل أونلاين عبر الزوم أو الاتصالات المباشرة للتيسير عليك. لحجز موعد لزيارتنا أو لعقد اجتماع افتراضي، اضغط على زر التواصل عبر الواتساب بالأسفل! 💬`;
          }
          if (msg.includes("مستشار") || msg.includes("مجانية") || msg.includes("حجز")) {
            return `يسعدنا جداً تقديم **استشارة تسويقية مجانية** بالكامل لمشروعك! 🤝
خلال الاستشارة، سيقوم مستشار تسويقي من فريق **دلّني** بـ:
1. فحص ملفك التجاري الحالي على خرائط جوجل أو صفحاتك التسويقية.
2. تحديد نقاط القوة والفرص الضائعة لزيادة مبيعاتك.
3. تقديم خطة مبدئية سريعة ومجانية لتحسين ترتيبك وظهورك لجلب عملاء جدد.

**كيف تحجز؟**
ببساطة اضغط على زر الواتساب العائم في الأسفل وسيقوم أحد مسؤولي الدعم بحجز الموعد الأنسب لك فوراً! 📞`;
          }
          return `يسعدنا تواصلك معنا في أي وقت! 📞
يمكنك التواصل مع وكالة **دلّني** مباشرة عبر الطرق التالية:
1. **الواتساب الفوري:** عبر الضغط على الزر الأخضر بالأسفل لتفتح محادثة مباشرة مع الدعم الفني.
2. **نموذج الاتصال بالموقع:** املأ بياناتك في نموذج "اتصل بنا" المتواجد في الموقع، وسنعاود الاتصال بك هاتفياً خلال أقل من ساعتين عمل.

نحن هنا لمساعدتك على الازدهار! 🚀`;
        }

        // Greetings & General Fallbacks
        if (msg.includes("سلام") || msg.includes("مرحبا") || msg.includes("مرحباً") || msg.includes("أهلاً") || msg.includes("اهلا") || msg.includes("صباح") || msg.includes("مساء") || msg.includes("هاي") || msg.includes("هلا") || msg.includes("السلام")) {
          return `أهلاً بك وسهلاً! أنا **دَلّوب** 🤖 مستشارك التسويقي الذكي من وكالة **دلّني**. 

يسعدني جداً وجودك اليوم. هل ترغب في معرفة المزيد عن خدماتنا في:
- تصدر نتائج البحث على خرائط جوجل 📍
- إدارة الحملات الإعلانية المربحة 📣
- استعراض أسعار الباقات المتاحة 💰
- حجز استشارتك المجانية فوراً 🤝`;
        }

        // Fallback default message when no keywords match but keeps it extremely high quality
        return `مرحباً بك! سؤالك قيم جداً. بصفتي المساعد الذكي لوكالة **دلّني** للتسويق الرقمي 🤖، أود مساعدتك في كل ما يخص تطوير عملك، خاصة خدمات تصدر خرائط جوجل وزيادة المبيعات من الإعلانات الممولة.

هل يمكنك توضيح استفسارك أكثر؟ أو اختيار أحد المواضيع السريعة بالأسفل (مثل باقات الخرائط، رفع التقييمات، أو حجز استشارة مجانية) لأعطيك إجابة دقيقة وحلولاً عملية فورية! 🚀`;
      };

      const appendFallbackSuffix = (text: string) => {
        return text + "\n\n*(ملاحظة ودية: تم تقديم هذه الإجابة الوافية عبر نظام المساعد الاحتياطي المدمج نظراً لعدم توفر اتصال بخادم Gemini حالياً ⚠️)*";
      };

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("No GEMINI_API_KEY found, invoking smart backup handler.");
        return res.json({ text: appendFallbackSuffix(getSmartFallbackResponse(userMessage)) });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format history into the format that @google/genai expects
      // history items: { role: "user" | "model", message: string }
      const formattedHistory = chatHistory.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.message || "" }]
      }));

      const systemInstruction = `أنت "دلّوب" (Dalloub)، المساعد الذكي التفاعلي والمستشار التسويقي لوكالة "دلّني" (Dalni) للتسويق الرقمي المتكامل.

مهمتك الأساسية هي مساعدة أصحاب الأعمال والأنشطة التجارية في فهم خدمات وكالة "دلّني"، وتقديم نصائح تسويقية ممتازة وذكية في مجالات:
1. خرائط Google: إنشاء وتوثيق النشاط التجاري، تحسين الظهور المحلي (Local SEO)، تصدر نتائج البحث "بالقرب مني"، وكتابة وإدارة التعليقات والمراجعات باحترافية وأمان لرفع التقييمات.
2. إدارة الحملات الإعلانية: Google Ads (البحث، العرض، يوتيوب، التسوق)، إعلانات تيك توك، إعلانات إنستغرام، وإعلانات سناب شات.
3. الترويج لباقات وخدمات وكالة "دلّني" بناءً على الأسعار والمميزات المذكورة في بيانات الوكالة الرسمية.

قواعد مهمة يجب عليك اتباعها دائماً:
- تحدث بلهجة عربية ودية، مهذبة، واحترافية تناسب مختلف العملاء وأصحاب الأعمال.
- شجع المستخدمين على ترقية أعمالهم والوصول لعملاء أكثر بالتعاون مع وكالة "دلّني".
- إذا سأل العميل عن الأسعار أو تفاصيل باقة معينة، اعرض له المعلومات المتاحة بدقة (مثلاً باقات إنشاء خرائط جوجل تبدأ من الأساسية بـ 1500، المتقدمة بـ 2500، والشاملة بـ 4000 جنيه مصري).
- اذكر مميزات الوكالة مثل: النتائج القابلة للقياس، الحلول التسويقية المتكاملة الشاملة، والتواصل المباشر والسهل عبر الواتساب.
- إذا رغب العميل في التواصل المباشر أو حجز خدمة، أخبره أنه يمكنه الضغط على زر التواصل عبر واتساب، أو حجز الخدمة مباشرة من الموقع، أو كتابة بياناته في نموذج الاتصال وسيقوم فريق المبيعات بالتواصل معه فورا.
- اجعل إجاباتك منظمة وسهلة القراءة باستخدام النقاط (bullet points) والخط العريض لتسهيل القراءة واستخدام الفقرات القصيرة والرموز التعبيرية المناسبة لإضفاء حيوية على الحوار.
- لا تذكر أبداً أي تفاصيل تقنية حول الخادم أو كود التطبيق، ركز بالكامل على تقديم تجربة عملاء رائعة لزوار "دلّني".`;

      const modelsToTry = ["gemini-3.1-flash-lite", "gemini-3.5-flash"];
      let lastError: any = null;
      let textResponse = "";

      for (const modelName of modelsToTry) {
        try {
          const chat = ai.chats.create({
            model: modelName,
            config: {
              systemInstruction
            },
            history: formattedHistory
          });

          const response = await chat.sendMessage({ message: userMessage });
          if (response && response.text) {
            textResponse = response.text;
            console.log(`Successfully generated response using model: ${modelName}`);
            break; // Success!
          }
        } catch (err: any) {
          const errorMsg = err?.message || "";
          const isDenied = errorMsg.includes("denied access") || errorMsg.includes("PERMISSION_DENIED") || errorMsg.includes("403");
          if (isDenied) {
            console.warn(`Model ${modelName} returned permission restriction (GEMINI_API_KEY project permission denied or restricted).`);
          } else {
            console.log(`Model ${modelName} was busy or failed, trying fallback if available. Error:`, errorMsg);
          }
          lastError = err;
        }
      }

      if (!textResponse && lastError) {
        const errorMsg = lastError.message || "";
        const errorStr = typeof lastError === 'string' ? lastError : JSON.stringify(lastError);
        const isPermissionDenied = errorMsg.includes("denied access") || 
                                    errorMsg.includes("PERMISSION_DENIED") || 
                                    errorMsg.includes("403") || 
                                    errorStr.includes("denied access") || 
                                    errorStr.includes("PERMISSION_DENIED") || 
                                    errorStr.includes("403");

        if (isPermissionDenied) {
          console.warn("Using smart backup handler as Gemini API returned PERMISSION_DENIED/403.");
          return res.json({ text: appendFallbackSuffix(getSmartFallbackResponse(userMessage)) });
        }
        throw lastError;
      }

      res.json({ text: textResponse || "عذراً، لم أتمكن من معالجة طلبك حالياً. يرجى المحاولة مرة أخرى." });
    } catch (err: any) {
      const errorMsg = err.message || "";
      const isPermissionDenied = errorMsg.includes("denied access") || errorMsg.includes("PERMISSION_DENIED") || errorMsg.includes("403");
      
      // Secondary fallback in catch block
      const getSmartFallbackResponseAlt = (userMsg: string): string => {
        const msg = userMsg.toLowerCase().trim();
        if (msg.includes("ترتيب") || msg.includes("نشاط") || msg.includes("خرائط") || msg.includes("خريطة") || msg.includes("الخرائط") || msg.includes("الخريطة") || msg.includes("ظهور")) {
          return `لتحسين ترتيب نشاطك التجاري وتصدره على خرائط جوجل 📍، تقوم وكالتنا **دلّني** بالخطوات التالية:
- **تحسين الملف الشخصي (Local SEO):** صياغة اسم الملف بدقة وإضافة الكلمات المفتاحية الأكثر بحثاً.
- **إدارة التقييمات والمراجعات:** كتابة مراجعات حقيقية وتفاعلية لزيادة الثقة والترتيب.

يمكننا بدء العمل فوراً لمضاعفة مبيعاتك عبر الخرائط! يمكنك التواصل معنا لحجز استشارتك المجانية. 📈`;
        }
        if (msg.includes("حملات") || msg.includes("إعلانات") || msg.includes("حملة") || msg.includes("إعلان") || msg.includes("منصات") || msg.includes("مربحة")) {
          return `وكالة **دلّني** تدير حملات إعلانية احترافية ممولة عبر كبرى المنصات الرقمية لضمان أقصى وصول لجمهورك المستهدف 📣:
1. **Google Ads:** إعلانات شبكة البحث وإعلانات يوتيوب.
2. **TikTok, Instagram & Facebook Ads:** حملات تواصل تفاعلية وزيادة للمبيعات المباشرة.

دعنا نساعدك في إدارة ميزانيتك الإعلانية بذكاء لتجلب لك عملاء فعليين لا مجرد مشاهدات!`;
        }
        if (msg.includes("سعر") || msg.includes("أسعار") || msg.includes("اسعار") || msg.includes("باقة") || msg.includes("باقات") || msg.includes("تكلفة")) {
          return `باقات تحسين خرائط جوجل 📍 من وكالة **دلّني** مصممة لتناسب مختلف الميزانيات:
1. **الباقة الأساسية (1,500 ج.م / شهرياً):** تشمل إنشاء وتوثيق النشاط التجاري، إضافة البيانات وتعديل الأوقات والخدمات.
2. **الباقة المتقدمة (2,500 ج.م / شهرياً):** تشمل الأساسيات + تحسين شامل لـ الكلمات المفتاحية (Local SEO) وإدارة ومتابعة التقييمات.
3. **الباقة الشاملة (4,000 ج.م / شهرياً):** تشمل المتقدمة + حملات إعلانية ذكية للخرائط على محرك البحث وتحديثات مستمرة.`;
        }
        return `مرحباً بك! أنا **دَلّوب** 🤖 مستشارك التسويقي الذكي من وكالة **دلّني**. 

يسعدني جداً الإجابة على كافة استفساراتك حول تحسين الخرائط وإدارة الحملات الإعلانية الإبداعية. نرجو التواصل معنا لحجز استشارة تسويقية مجانية بالكامل لمشروعك! 🚀`;
      };

      if (isPermissionDenied) {
        console.warn("Gemini API access restricted (403/PERMISSION_DENIED). Returning smart fallback to user.");
        res.json({
          text: getSmartFallbackResponseAlt(userMessage) + "\n\n*(ملاحظة ودية: تم تقديم هذه الإجابة الوافية عبر نظام المساعد الاحتياطي المدمج نظراً لعدم توفر اتصال بخادم Gemini حالياً ⚠️)*"
        });
      } else {
        console.error("Gemini API Error:", err);
        res.status(500).json({ error: err.message || "حدث خطأ أثناء الاتصال بمساعد دلّني الذكي" });
      }
    }
  });

  // Temporary download route for single HTML file
  app.get('/download-html', (_req, res) => {
    const filePath = path.join(process.cwd(), 'dist', 'index.html');
    res.download(filePath, 'project.html');
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
