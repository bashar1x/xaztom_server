await History.findByIdAndUpdate('6810917b9bba1954c339a0e0', {
    $push: {
        messages: {
            role: 'model',
            parts: [
                {
                    text: `أهلاً بك! كيف يمكنني مساعدتك اليوم؟`,
                },
            ],
        },
    }
})

History.create({
        userId: '68108c5326d568c24f7c4740',
        title: 'new chat 1',
        messages: [
            {
                role: 'user',
                parts: [
                    {
                        text: `hi`,
                    },
                ],
            },
        ]
    }).then(() => console.log('add'))

const contents = [
    {
        role: 'user',
        parts: [
            {
                text: `مرحبا`,
            },
        ],
    },
    {
        role: 'model',
        parts: [
            {
                text: `أهلاً بك! كيف يمكنني مساعدتك اليوم؟`,
            },
        ],
        serching: [
            {
                "web": {
                  "uri": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqAJoybUIGMuy16pwvlEVYsVUc-p5XTQ1OGOzkFVRKf3EVmQBAx__8XQ00nlP0hJmua0RVxApm0KRIiXh3kJPJNoqt-5sZbpC85o5m4pzDZnLXbK2rwrsZKc_ISMiFlN8YC-jfQ8nRib6NrbDHYAq-WxV605DVg==",
                  "title": "syriasite.com"
                }
              },
              {
                "web": {
                  "uri": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AWQVqALuC2RM41eZK0l3OJdWAaMUczCnMgYG3d0sa3Bz_OAlNnj9Naq0pkUy9t_ee0QeXY2aw_8EaFgRGB7cTJyN0ywssl5HP5h0tgA98GERnFn1jTHO2jbTaA0e-MoxoMaqJkvNpArqR2haX1xGAjj4",
                  "title": "stackry.com"
                }
              },
        ]
    },
    {
        role: 'user',
        parts: [
            {
                text: `تقدر تعمل صوره كلب لونه ابيض`,
            },
        ],
    },
    {
        role: 'model',
        parts: [
            {
                text: `بالتأكيد! تفضل هذه الصورة لكلب أبيض:`,
            },
            {
                fileData: {
                    fileUri: files[0].uri,
                    mimeType: files[0].mimeType,
                }
            },
            {
                inlineData: {
                    data: `/QaDgmGlWW0w6X66n5fl6jNu9p+ULkbXNNp+n7eWIov6RWjLqR7X7FlzD5kw2+0g==...`,
                    mimeType: `image/png`,
                },
            },
            {
                text: `هل أعجبتك؟ هل تريد أي تعديل عليها أو صورة أخرى؟`,
            },
        ],
    },
    {
        role: 'user',
        parts: [
            {
                text: `INSERT_INPUT_HERE`,
            },
        ],
    },
];


const contents2 = [
    {
      role: 'model',
      parts: [
        {
          text: `سأقوم بإنشلالًا ناعمة على العشب الأخضر.`,
        },
        {
          inlineData: {
            data: `/QaDgmGlWW0w6X66n5fl6jNu9p+ULkbXNNp+n7eWIov6RWjLqR7X7FlzD5kw2+0g==...`,
            mimeType: `image/png`,
          },
        },
      ],
    },

  ];