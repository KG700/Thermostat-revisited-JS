feature 'power saving mode' do
  before do
    visit('/')
    page.find('#temperature-reset').click
  end

  it 'is on by default' do
    expect(page.find('#power-saving-status')).to have_content 'on'
  end

  it 'can be switched off' do
    page.find('#power-saving-off').click
    expect(page.find('#power-saving-status')).to have_content 'off'
  end

  context 'power saving mode is on' do
    it 'has a maximum temperature of 25' do
      6.times do
        page.find('#temperature-up').click
      end
      expect(page.find('#temperature')).to have_content 25
    end

    it 'resets the temperature if it is over 25' do
      page.find('#power-saving-off').click
      8.times do
        page.find('#temperature-up').click
      end
      expect(page.find('#temperature')).to have_content 28
      page.find('#power-saving-on').click
      expect(page.find('#temperature')).to have_content 25
    end
  end

  context 'power saving mode is off' do
    it 'has a maximum temperature of 32' do
      visit('/')
      page.find('#power-saving-off').click
      13.times do
        page.find('#temperature-up').click
      end
      expect(page.find('#temperature')).to have_content 32
    end
  end
end
