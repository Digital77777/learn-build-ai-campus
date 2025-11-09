-- Create course_modules table
CREATE TABLE IF NOT EXISTS public.course_modules (
  id BIGSERIAL PRIMARY KEY,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_id TEXT,
  duration TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, module_id)
);

-- Insert course modules data
INSERT INTO public.course_modules (course_id, module_id, title, description, video_id, duration)
VALUES
  ('ai-fundamentals', 'intro-to-ai', 'Introduction to AI', 'Understanding what AI is and its applications', 'ad79nYk2keg', '45 min'),
  ('ai-fundamentals', 'ml-basics', 'Machine Learning Basics', 'Core concepts of machine learning algorithms', 'Gv9_4yMHFhI', '38 min'),
  ('ai-fundamentals', 'neural-networks', 'Neural Networks', 'How neural networks work and their applications', 'bfmFfD2RIcg', '52 min'),
  ('ai-fundamentals', 'python-for-ai', 'Python for AI', 'Programming fundamentals for AI development', 'WGJJIrtnfpk', '41 min'),
  ('nlp', 'text-processing', 'Text Processing', 'Preprocessing and analyzing text data', 'fOvTtapxa9c', '35 min'),
  ('nlp', 'language-models', 'Language Models', 'Understanding and building language models', 'zizonToFXDs', '42 min'),
  ('nlp', 'chatbot-development', 'Chatbot Development', 'Creating intelligent conversational AI', 'EPnRSVreMzI', '48 min'),
  ('nlp', 'sentiment-analysis', 'Sentiment Analysis', 'Analyzing emotions and opinions in text', 'QpzMWQvxXWk', '33 min'),
  ('computer-vision', 'image-processing', 'Image Processing', 'Fundamentals of digital image processing', 'XkVdwrmN_h0', '40 min'),
  ('computer-vision', 'object-detection', 'Object Detection', 'Detecting and classifying objects in images', 'tFNJGim3FXw', '45 min'),
  ('computer-vision', 'face-recognition', 'Face Recognition', 'Building facial recognition systems', 'FgakZw6K1QQ', '38 min'),
  ('computer-vision', 'ai-art-generation', 'AI Art Generation', 'Creating art using AI algorithms', 'SVcsDDABEkM', '36 min'),
  ('ai-business', 'business-ai-strategy', 'Business AI Strategy', 'Developing AI strategies for business growth', 't4kyRyKyOpo', '44 min'),
  ('ai-business', 'roi-analysis', 'ROI Analysis', 'Measuring return on investment for AI projects', 'RSKlSkgV_gI', '32 min'),
  ('ai-business', 'implementation', 'Implementation', 'Best practices for AI implementation', 'SN5KToeTfUY', '50 min'),
  ('ai-business', 'client-consulting', 'Client Consulting', 'Consulting clients on AI solutions', 'wjZofJX0v4M', '39 min');
