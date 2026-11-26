// The contact form (contact.html): posts to the Muse API Worker, which puts each message in Muse Shelf's
// Feedback inbox. In its own file so the site's Content-Security-Policy (_headers) needs no inline scripts.
(() => {
  const API = 'https://muse-tracker-api.jasonmuse.workers.dev/api/contact';
  const form = document.getElementById('contact');
  const sent = document.getElementById('sent');
  const status = document.getElementById('status');
  const count = document.getElementById('count');
  const handleField = document.getElementById('handle-field');
  const reportNote = document.getElementById('report-note');
  const button = form.querySelector('button[type=submit]');
  const topics = [...form.querySelectorAll('input[name=topic]')];

  // Links can choose the topic and app: contact.html?topic=report&app=frog-quest
  const params = new URLSearchParams(location.search);
  const wanted = topics.find((radio) => radio.value === params.get('topic'));
  if (wanted) wanted.checked = true;
  if ([...form.app.options].some((option) => option.value === params.get('app'))) form.app.value = params.get('app');

  const topic = () => topics.find((radio) => radio.checked)?.value ?? '';
  // What to write, for each topic.
  const prompts = {
    problem: 'What happened, and what were you doing when it did?',
    idea: 'What would you like Muse to do?',
    other: 'Say whatever you like.',
    question: 'What would you like to know?',
    report: 'What happened, and where did you see it?',
  };
  const showHandle = () => {
    const reporting = topic() === 'report';
    handleField.hidden = !reporting;
    reportNote.hidden = !reporting;
    form.message.placeholder = prompts[topic()] ?? 'What’s on your mind?';
  };
  const showCount = () => { count.textContent = `${form.message.value.length} / 2000`; };
  const say = (text, problem = false) => { status.textContent = text; status.classList.toggle('error', problem); };
  form.addEventListener('change', showHandle);
  form.message.addEventListener('input', showCount);
  showHandle();
  showCount();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!topic()) return say('Choose what it’s about first.', true);
    if (form.message.value.trim().length < 10) {
      form.message.focus();
      return say('Write a little more, so we know how to help.', true);
    }
    button.disabled = true;
    say('Sending…');
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic(),
          app: form.app.value,
          handle: topic() === 'report' ? form.handle.value : '',
          message: form.message.value,
          email: form.email.value,
          website: form.website.value,
        }),
      });
      const answer = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(answer.error || 'That didn’t send. Please try again in a moment.');
      document.getElementById('sent-text').textContent = form.email.value.trim()
        ? 'Nobody else sees it. I’ll write back to the email you left.'
        : 'Nobody else sees it.';
      form.reset();
      showHandle();
      showCount();
      say('');
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    } catch (error) {
      say(error instanceof TypeError ? 'That didn’t send. Check your connection and try again.' : error.message, true);
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById('again').addEventListener('click', () => {
    sent.hidden = true;
    form.hidden = false;
    topics[0].focus();
  });
})();
