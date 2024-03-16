import { OpenAiAdapter } from './openai-adapter';
import { OpenAiClient } from './openai-client';

describe('OpenAiClient', () => {
  let openAiClient: OpenAiClient;
  let mockOpenAiAdapter: jasmine.SpyObj<OpenAiAdapter>;

  const fakeAiConfig = {
    apiKey: 'fakeKey',
    modelConfig: {
      model: 'fakeModel',
      temperature: 0.67,
    },
  };

  const fakeMessages = [
    {
      role: 'system',
      content: 'fake system message',
    },
  ];

  beforeEach(() => {
    mockOpenAiAdapter = jasmine.createSpyObj<OpenAiAdapter>(['complete']);
    const mockOpenAiAdapterFactory = () => mockOpenAiAdapter;
    openAiClient = new OpenAiClient(fakeAiConfig, mockOpenAiAdapterFactory);
  });

  it('should bake the model config into the completion request', async () => {
    await openAiClient.createCompletion(fakeMessages);

    expect(mockOpenAiAdapter.complete).toHaveBeenCalledOnceWith({
      ...fakeAiConfig.modelConfig,
      messages: fakeMessages,
    });
  });
});
