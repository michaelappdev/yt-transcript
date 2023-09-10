const { YoutubeTranscript } = require('youtube-transcript');

module.exports = async (context) => {
  const { videoId } = context.params;

  try {
    const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);

    // Extract and aggregate all the text values
    let aggregatedText = rawTranscript.map(item => item.text).join(' ');

    // Check if text exceeds 90k characters
    if (aggregatedText.length > 90000) {
      aggregatedText = aggregatedText.substring(0, 90000);
      aggregatedText = "Note: The transcript was truncated to 90k characters. " + aggregatedText;
    }

    return { text: aggregatedText };
  } catch (error) {
    console.error('Failed to fetch transcript', error);
    return { error: 'Failed to fetch transcript' };
  }
};
